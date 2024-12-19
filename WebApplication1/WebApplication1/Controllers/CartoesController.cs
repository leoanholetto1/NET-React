using Microsoft.AspNetCore.Mvc;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    /// <summary>
    /// Gerenciar Cartão.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CartoesController : ControllerBase
    {
        private readonly Service.CartaoService _cartaoService;

        public CartoesController(Service.CartaoService cartaoService)
        {
            _cartaoService = cartaoService;
        }
        /// <summary>
        /// Recebe um cartão e verifica a bandeira.
        /// </summary>
        /// <param name="cartao">Número do cartão</param>
        /// <returns>Retorna a bandeira do cartão.</returns>
        [HttpGet("/cartoes/{cartao}/obter-bandeira")]
        public IActionResult ObterBandeira(string cartao)
        {
            string bandeira;
            cartao = cartao.Replace("-", "");
            if(cartao.Length < 13)
            {
                bandeira = "";
            }
            else if (cartao[0] == '1' && cartao[1] == '1' && cartao[2] == '1' && cartao[3] == '1' && cartao[8] == '1')
            {
                bandeira = "VISA";
            }
            else if (cartao[0] == '2' && cartao[1] == '2' && cartao[2] == '2' && cartao[3] == '2' && cartao[8] == '2')
            {
                bandeira = "MASTERCARD";
            }
            else if (cartao[0] == '3' && cartao[1] == '3' && cartao[2] == '3' && cartao[3] == '3' && cartao[8] == '3')
            {
                bandeira = "ELO";
            }
            else
            {
                bandeira = "";
            }

            if (bandeira == "")
            {
                return NotFound();
            }
            else
            {
                return Ok(new
                {
                    Bandeira = bandeira
                });
            }
        }
        /// <summary>
        /// Recebe um cartão e verifica se é valido.
        /// </summary>
        /// <param name="cartao">Número do cartão</param>
        /// <returns>Retorna um valor booleano para dizer se o cartao é valido ou não.</returns>
        [HttpGet("/cartoes/{cartao}/valido")]
        public bool ValidaCartao(string cartao)
        {
            cartao = cartao.Replace("-", "");

            var cartaoObj = _cartaoService.Obter(cartao);

            if(cartaoObj == null)
            {
                return false;
            }
            else
            {
          
                if ( cartaoObj.Validade >= DateTime.Today)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
