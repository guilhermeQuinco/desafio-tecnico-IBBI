import { app } from "./app.js";

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Api rodando na porta ${PORT}`);
});
