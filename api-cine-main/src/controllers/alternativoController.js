// import Usuario from "../models/UsuariosModel.js";
// import Sessao from "../models/SessoesModel.js";
// import { Op } from "sequelize";
// import moment from "moment-timezone";
// import { sequelize } from "../configs/postgres.js";
import usuariosessaoController from "./usuariosessaoController.js";

// class AlternativoController {

//   static formatDate(date) {
//     return moment(date).format("DD/MM/YYYY HH:mm");
//   }

//   static async comprarSessao(req, res) {
//     try {
//       const { lugar } = req.params;
      
//       if (!lugar) {
//         return res.status(400).send({ error: "Lugar não informado" });
//       } 
//       const dados = req.body; 

//       if (!dados.idSessao || !dados.idUsuario ) {
//         return res.status(400).send({ error: "Informações inválidas" });
//       }

//       const usuario = await Usuario.findByPk(dados.idUsuario);
//       if (!usuario) {
//         return res.status(400).send({
//           error: `Nenhum usuário encontrado com o id ${dados.idUsuario}`,
//         });
//       }

//       usuario.idCargo = await usuario.getCargo();
      
//       if (usuario.idCargo?.descricao === "atendente") {
//         return res.status(400).send({
//           error: "Atendentes não podem comprar ingressos",
//         });
//       }

//       const sessaoBanco = await Sessao.findOne({
//         where: {
//           id: dados.idSessao,
//           dataInicio: {
//             [Op.gt]: new Date(Date.now()),
//           },
//         },
//       });

//       if (!sessaoBanco) {
//         return res.status(400).send({
//           error: `Nenhuma sessão válida encontrada com o id ${dados.idSessao}`,
//         });
//       }

//       const sessao = sessaoBanco.toJSON();

//       const dataInicio = moment.tz(sessao.dataInicio, "utc").format();
//       const dataFim = moment.tz(sessao.dataFim, "utc").format();

//       const sessoesConflito = await sequelize
//         .query(
//           `
//         SELECT
//           s.*
//         FROM sessoes AS s
//         JOIN usuarios_sessoes AS us ON (s.id = us.id_sessao)
//         WHERE us.id_usuario = ${usuario.id} 
//           AND (('${dataInicio}' BETWEEN s.data_inicio AND s.data_fim) 
//           OR ('${dataFim}' BETWEEN s.data_inicio AND s.data_fim) 
//           OR ('${dataInicio}' < s.data_inicio AND '${dataFim}' > s.data_fim));
//       `
//         )
//         .then((a) => a[0]);

//       if (sessoesConflito.find((a) => a.id === sessao.id)) {
//         return res.status(400).send({
//           error: "Usuário já comprou ingresso para essa sessão!",
//         });
//       }

//       if (sessoesConflito.length) {
//         return res.status(400).send({
//           error: "Usuário já comprou ingresso para outra(s) sessões neste horário!",
//         });
//       }

//     console.log(sessao);
    
//       const indexLugar = sessao.lugares.findIndex(
//         (a) => a.lugar === Number(lugar)
//       );

//       if (indexLugar === -1) {
//         return res.status(400).send({ error: "Lugar não encontrado na sessão!" });
//       }

//       if (sessao.lugares[indexLugar].alocado) {
//         return res.status(400).send({
//           error: "Lugar escolhido já se encontra vendido!",
//         });
//       }

//       sessao.lugares[indexLugar].alocado = true;
//       sessao.lugares[indexLugar].idUsuario = usuario.id;
//       sessaoBanco.lugares = sessao.lugares;

//       await sessaoBanco.save();

//       sessaoBanco.idFilme = await sessaoBanco.getFilme();

//       const responseFim = {
//         Filme: sessaoBanco.idFilme.nome,
//         Sessão: AlternativoController.formatDate(sessao.dataInicio), 
//         Valor: Number(sessao.preco),
//       };

//       usuariosessaoController.create({
//         idUsuario: usuario.id,
//         idSessao: sessaoBanco.id,
//         valorAtual: sessaoBanco.preco,
//       });

//       return res.status(201).send(responseFim);

//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({ error: "Erro interno no servidor" });
//     }
//   }

//   static async getSessoesDisponiveis(req, res) {
//     try {
//       const sessoes = await Sessao.findAll({
//         where: {
//           dataInicio: {
//             [Op.gt]: new Date(),
//           },
//         },
//         order: [["id", "asc"]],
//       });

//       if (!sessoes.length) {
//         return res.status(400).send({
//           error: "Nenhuma sessão disponível para a compra!",
//         });
//       }

//       const sessoesFiltradas = sessoes
//         .filter((a) => {
//           const lugares = a.lugares.filter((b) => !b.vendido);
//           return lugares.length > 0;
//         })
//         .map((item) => {
//           const itemFormatado = item.toJSON();
//           itemFormatado.dataFim = AlternativoController.formatDate(itemFormatado.dataFim); // Usando a função formatDate
//           itemFormatado.dataInicio = AlternativoController.formatDate(itemFormatado.dataInicio); // Usando a função formatDate
//           return itemFormatado;
//         });

//       return res
//         .status(200)
//         .send({ message: "Busca feita com sucesso", data: sessoesFiltradas });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({ error: "Erro interno no servidor" });
//     }
//   }
// }

// export default AlternativoController;
