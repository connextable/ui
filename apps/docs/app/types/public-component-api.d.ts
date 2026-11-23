declare module "virtual:public-component-api" {
  const components: Readonly<Record<string, readonly import("~/data/catalog-reference").DeclaredApiMember[]>>;
  export default components;
}
