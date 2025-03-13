module.exports = {
    HOST: process.env.DB_HOST || "db",
    USER: process.env.DB_USER || "anderson",
    PASSWORD: process.env.DB_PASS || "126303@acv",
    DB: process.env.DB_NAME || "db_gestaotributaria_riachaodojacuipe",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
  };
  