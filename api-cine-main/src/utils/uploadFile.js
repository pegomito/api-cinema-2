import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Função para fazer o upload de arquivos
 * @param file deve ser um arquivo vindo de req.files
 * @param params deve serum objeto contendo tipo tabela e id  
 * id: chave primaria do registro que tera ligacao com a imagem
 * tabela: nome da tabela que tera ligacao com o id cadastrado
 * tipo: tipo de arquivo que sera enviado, exemplo: imagem, video, audio
 * @return Objeto contendo erro ou sucesso
 **/
export default async (file, params) => {

    try{    const __dirname = dirname(fileURLToPath(import.meta.url));
            let extensao = path.extname(file.name);
            let filePath = `public/${params.tipo}/${params.tabela}/${params.id}${extensao}`;
            let uploadPath = `${__dirname}/../../${filePath}`;
            await file.mv(uploadPath);
            return {
                type: 'success',
                message: 'arquivo enviado com sucesso',
                uploadPath
            } 

        } catch (error) {
            return{
                type: 'erro',
                message: error.message
            }
        }
    }

    


