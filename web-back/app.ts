import Aqua from "aqua";

const app: Aqua = new Aqua(3000);

app.serve("web-front/public", "/");
app.get("/", () => {
    return { redirect: "/index.html" };
});

export default app;
