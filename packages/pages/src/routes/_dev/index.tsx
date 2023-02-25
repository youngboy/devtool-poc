import { RequestHandler } from "@builder.io/qwik-city";
import cityPlan from "@qwik-city-plan";
import pkg from "../../../package.json";

export interface DevData {
  versions: Record<string, string>;
  routes: {
    pattern: string;
    loaders: string[];
    paramNames?: string;
  }[];
  menus: {
    pathname: string;
    loader: string;
  }[];
}

export const onGet: RequestHandler<DevData> = (request) => {
  const routes = cityPlan.routes.map((i) => {
    const [pattern, loaders, paramNames, originalPathname] = i;
    return {
      pattern: pattern.source,
      loaders: loaders.map((i: any) => i.name || `${originalPathname}index`),
      paramNames,
    };
  });
  const menus = cityPlan.menus.map((i) => {
    const [pathname, loader] = i;
    return {
      pathname,
      loader: loader.name || `${pathname}menu`,
    };
  });
  request.json(200, {
    versions: {
      qwik: pkg.devDependencies["@builder.io/qwik"],
      qwikCity: pkg.devDependencies["@builder.io/qwik-city"],
    },
    menus,
    routes,
  });
};
