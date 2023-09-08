// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 4000;
const DELAY = 0;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, DELAY);
});

router.render = (req, res) => {
    let data = res.locals.data;
    const { originalUrl } = req;
    if (
        req.method === "GET" &&
        (originalUrl === "/todolist" || /^\/todolist\?.*$/.test(originalUrl))
    ) {
        data = data.map((todo) => ({
            id: todo.id,
            type: todo.type,
            heading: todo.heading,
            title: todo.title,
            content: todo.content,
            createdAt: todo.createdAt,
        }));
    }
    res.json(data);
};

// Use default router
server.use(router);
server.listen(PORT, () => {
    console.log(`JSON Server is running at http://localhost:${PORT}`);
});
