require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const fs = require('fs');
const pool = require('../config/db');

const exportar = async (formato = 'json') => {
  const result = await pool.query('SELECT * FROM equipamentos ORDER BY id ASC');
  const dados = result.rows;

  if (formato === 'json') {
    fs.writeFileSync('equipamentos.json', JSON.stringify(dados, null, 2));
    console.log('✅ Arquivo equipamentos.json gerado com sucesso!');
  } else if (formato === 'csv') {
    const header = 'id,nome,tipo,data_aquisicao,status';
    const linhas = dados.map(
      (e) => `${e.id},"${e.nome}","${e.tipo}","${new Date(e.data_aquisicao).toLocaleDateString('pt-BR')}","${e.status}"`
    );
    fs.writeFileSync('equipamentos.csv', [header, ...linhas].join('\n'));
    console.log('✅ Arquivo equipamentos.csv gerado com sucesso!');
  }

  await pool.end();
};

const formato = process.argv[2] || 'json';
exportar(formato);