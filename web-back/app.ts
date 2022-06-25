import Aqua from "aqua";

const app: Aqua = new Aqua(3000);

app.serve("web-front", "/dashboard");

export default app;
