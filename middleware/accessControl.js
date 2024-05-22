const accessControl = () => {
  const allowedRoutes = {
    admin: {
      GET: ["/route1", "/route2", "/route3"],
      POST: ["/route1", "/route2", "/route3"],
    },
    headOffice: {
      GET: ["/", "/route2"],
      POST: ["/route1"],
    },
    district: {
      GET: ["/route1", "/route2"],
      POST: ["/route1"],
    },
    branch: {
      GET: ["/route1", "/route2"],
      POST: ["/", "/dispose"],
    },
  };
  return (req, res, next) => {
    const { role } = req.user;
    const { path, method } = req.route;

    if (
      allowedRoutes[role] &&
      allowedRoutes[role][method] &&
      allowedRoutes[role][method].includes(path)
    ) {
      next();
    } else {
      res.status(403).json({
        message: "Forbidden: You do not have permission to perform this action",
      });
    }
  };
};

module.exports = { accessControl };
