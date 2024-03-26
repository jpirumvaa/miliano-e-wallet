/* eslint-disable object-shorthand */
/* eslint-disable func-names */
export default () => {
  const pattern = /^\[.*\]$/;

  const whitelistedLink = pattern.test(process.env.FRONTEND_URL)
    ? JSON.parse(process.env.FRONTEND_URL)
    : process.env.FRONTEND_URL;
  const whitelist = Array.isArray(whitelistedLink)
    ? [...whitelistedLink]
    : [whitelistedLink];

  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`Cors blocked this origin ${origin}`));
      }
    },
    credentials: true
  };
  return corsOptions;
};
