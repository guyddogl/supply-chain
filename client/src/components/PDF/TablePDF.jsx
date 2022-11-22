import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatDateTime } from '../../utils/dateTime';

export default function TablePDF(action, initialDate, dataFinal, dados) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const tableData = dados.map((dado) => [
    {
      text: formatDateTime(dado.data_hora), fontSize: 10,
    },
    {
      text: dado.quantidade, fontSize: 10,
    },
    {
      text: dado.mercadoria, fontSize: 10,
    },
    {
      text: dado.tipo, fontSize: 10,
    },
    {
      text: dado.local, fontSize: 10,
    },
  ]);

  const footer = (currentPage, pageCount) => {
    const page = {
      text: `${pageCount > 1 ? 'Páginas ' : 'Página '}${currentPage}/${pageCount}`,
      alignment: 'right',
      fontSize: 12,
      margin: [0, 15, 25, 45],
    };
    return page;
  };

  const options = {
    watermark: {
      text: 'MStarSupply', angle: 60, fontSize: 100, opacity: 0.1,
    },
    content: [
      {
        text: 'MStarSupply',
        alignment: 'center',
        fontSize: 20,
        bold: true,
      },
      {
        text: 'Relatório de Entradas e Saídas',
        alignment: 'center',
        fontSize: 15,
        margin: [15, 15, 15, 5],
        bold: true,
      },
      {
        text: `${formatDateTime(initialDate)} a ${formatDateTime(dataFinal)}`,
        alignment: 'center',
        fontSize: 10,
        margin: [15, 15, 15, 15],
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*'],
          body: [
            [
              {
                text: 'Data', style: 'header', bold: true, fontSize: 12,
              },
              {
                text: 'Qntd', style: 'header', bold: true, fontSize: 12,
              },
              {
                text: 'Mercadoria', style: 'header', bold: true, fontSize: 12,
              },
              {
                text: 'Categoria', style: 'header', bold: true, fontSize: 12,
              },
              {
                text: 'Local', style: 'header', bold: true, fontSize: 12,
              },
            ],
            ...tableData,
          ],
        },
      },
    ],
    footer,
  };

  const pdfAction = () => {
    if (action === 'visualizar') return pdfMake.createPdf(options).open();
    if (action === 'salvar') return pdfMake.createPdf(options).download('Relatório - MStarSupply');
    return pdfMake.createPdf(options).print();
  };

  return pdfAction();
}
