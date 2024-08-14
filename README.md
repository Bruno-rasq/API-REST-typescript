# API REST


Uma API REST(representational state tranfer) é uma interface de comunicação que permite
que diferentes sistemas se comuniquem entre si usando o protocolo HTTP. Em uma API REST os
recursos (como dados de usuarios, produtos e etc...) são  representados por URLs e as operações
para criar, atualizar, deletar e ler estes dados são realizados por meios de metodos HTTP 
como POST, GET, PUT, DELETE e mais...

![example](./public/assets/example.png)


A ideia deste diretorio é desenvolver um CRUD simples porém completinho com todos os metodos
HTTP, autenticação, testes automatizados, migrações, paginação e mais...


//Rotas disponiveis:
```typescript

const router = Router();

//router = method => path, middleware, controller
router.get("/", setDataSource(data_source), userControllers.get);
router.post("/", setDataSource(data_source), userControllers.post);
router.get("/:id", setDataSource(data_source), userControllers.getWithID);
router.delete("/:id", setDataSource(data_source), userControllers.delete);
router.put("/:id", setDataSource(data_source), userControllers.update);

export { router };
```

//TODO: DOCUMENTAR PROJETO