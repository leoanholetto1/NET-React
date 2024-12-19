namespace WebApplication1.Entidade
{
    public class Pagamento
    {
        public int Id {  get; set; }

        public decimal Valor { get; set; }

        public Cartao Cartao { get; set; }

        public string CVV { get; set; }

        public int Parcelas { get; set; }
        public enum Situacao
        {
            Pendente = 1,
            Confirmado = 2,
            Cancelado = 3
        }
        public Situacao situacao { get; set; }
    }
}
