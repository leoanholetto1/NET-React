using Microsoft.AspNetCore.Mvc;
using WebApplication1.Service;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApplication1.Controllers
{
    /// <summary>
    /// Crie e gerenciar Pagamento.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PagamentoController : ControllerBase
    {
        private readonly Service.PagamentoService _pagamentoService;

        public PagamentoController(Service.PagamentoService pagamentoService)
        {
            _pagamentoService = pagamentoService;
        }
        /// <summary>
        /// Recebe uma requisição onde no corpo tem o valor total, o número de parcelas e a quantidade de parcelas.
        /// </summary>
        /// <returns>Retorna a lista das parcelas e o valor de cada parcela</returns>
        [HttpPost("/pagamentos/calcular-parcelas")]
        public IActionResult CalcularParcelas([FromBody] ViewModel.CalcularParcelasViewModel calcularParcelas)
        {
            List<ViewModel.Parcelas> lista = new List<ViewModel.Parcelas>();
            decimal valor = (calcularParcelas.valorTotal *(1 + calcularParcelas.taxaJuros)) / calcularParcelas.quantidade , soma = 0;

            for(int i = 1; i <= calcularParcelas.quantidade; i++)
            {
                ViewModel.Parcelas parcela = new ViewModel.Parcelas();
                decimal numeroArredondado = Math.Floor(valor * 100) / 100;
                parcela.parcela = i;
                if (i != calcularParcelas.quantidade)
                    parcela.valor = numeroArredondado;
                else
                    parcela.valor = calcularParcelas.valorTotal * calcularParcelas.taxaJuros - soma;
                soma += numeroArredondado;
                lista.Add(parcela);
            }
            return Ok(lista);
        }

        /// <summary>
        /// Recebe um Id de pagamento para verificar a situação
        /// </summary>
        /// <param name="id">Id do pagamento</param>
        /// <returns>Retorna a situação do pagamento</returns>
        [HttpGet("/pagamentos/{id}/situacao")]
        public IActionResult ObterSituacao(int id)
        {
            var pagamento = _pagamentoService.Obter(id);

            if (pagamento == null)
            {
                return NotFound();
            }
            if(pagamento.situacao == Entidade.Pagamento.Situacao.Cancelado)
            {
                return Ok("Cancelado");
            }
            else if (pagamento.situacao == Entidade.Pagamento.Situacao.Pendente)
            {
                return Ok("Pendente");
            }
            else
            {
                return Ok("Confirmado");
            }
        }

        /// <summary>
        /// Recebe um Id de pagamento para confirmar.
        /// </summary>
        /// <param name="id">Id do pagamento</param>
        /// <returns>Retorna se funcionou ou não</returns>
        [HttpGet("/pagamentos/{id}/confirmar")]
        public IActionResult Confirmar(int id)
        {
            var pagamento = _pagamentoService.Obter(id);

            if (pagamento == null)
            {
                return BadRequest();
            }

            if(pagamento.situacao == Entidade.Pagamento.Situacao.Cancelado)
            {
                return BadRequest();
            }
            else
            {
                var confirmou = _pagamentoService.Confirmar(id);
                if (confirmou == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(); 
                }
            }
        }

        /// <summary>
        /// Recebe um Id de pagamento para cancelar.
        /// </summary>
        /// <param name="id">Id do pagamento</param>
        /// <returns>Retorna se funcionou ou não</returns>
        [HttpGet("/pagamentos/{id}/cancelar")]
        public IActionResult Cancelar(int id)
        {
            var pagamento = _pagamentoService.Obter(id);

            if (pagamento == null)
            {
                return BadRequest();
            }

            if (pagamento.situacao == Entidade.Pagamento.Situacao.Confirmado)
            {
                return BadRequest();
            }
            else
            {
                var cancelado = _pagamentoService.Cancelar(id);
                if (cancelado == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        /// <summary>
        /// Criar um novo pagamento.
        /// </summary>
        /// <returns>Retorna o Id do pagamento criado.</returns>
        [HttpPost("/pagamentos")]
        public IActionResult CriarAssistente([FromBody] ViewModel.PagamentoViewModel pagamentoView)
        {

            Entidade.Pagamento pagamento = new Entidade.Pagamento();
            Entidade.Cartao cartao = new Entidade.Cartao();
            cartao.Numero = pagamentoView.cartao;
            pagamento.Cartao = cartao;
            pagamento.CVV = pagamentoView.CVV;
            pagamento.Parcelas = pagamentoView.quantidade;
            pagamento.situacao = Entidade.Pagamento.Situacao.Pendente;
            pagamento.Valor = pagamentoView.Valor;
            var sucesso = _pagamentoService.Salvar(pagamento);


            if (!sucesso)
                return BadRequest();
            else
            {

                int idMaior = _pagamentoService.ultimo();
                var ultimo = _pagamentoService.Obter(idMaior);
                ultimo.Id = idMaior;
                if(ultimo == null)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok(ultimo);
                }
            }
        }
    }
}
