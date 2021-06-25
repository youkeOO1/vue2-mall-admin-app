/**
 * 不同用户显示的路由
 */
const roleToRouter = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductList',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductCategory',
    },
  ],
};
/**
 * 根据登录的用户过滤菜单中的路由
 * @param {*} role
 * @param {*} router
 */
export default function getMenuRouter(role, router) {
  // 根据登录的用户获取所有路由名字，将其作为数组返回
  const roleRouterName = roleToRouter[role].map((ele) => ele.name);
  // 根据路由名字对路由进行筛选
  const roleRouter = router.filter((r) => {
    const obj = r;
    // 查到符合规则的路由
    if (roleRouterName.indexOf(r.name) !== -1) {
      const { children } = obj;
      // 判断子路由那些路由符合规则
      obj.children = children.filter((chil) => roleRouterName.indexOf(chil.name) !== -1);
      return true;
    }
    return false;
  });
  return roleRouter;
}
