import "#app";
import "vue-router";

declare module "#app" {
  interface PageMeta {
    componentParts?: readonly string[];
  }
}

declare module "vue-router" {
  interface RouteMeta {
    componentParts?: readonly string[];
  }
}
