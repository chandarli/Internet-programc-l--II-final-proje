using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hastaportali.ViewModel
{
    public class ReceteModel
    {
        public string ReceteId { get; set; }
        public string IlacAdi { get; set; }
        public string Miktarlar { get; set; }
        public string Doz { get; set; }
        public string Sure { get; set; }
        public System.DateTime ReceteTarih { get; set; }
        public string E_imza { get; set; }

        public string Recetedoktorkimlik { get; set; }
        public string Recetedoktorad { get; set; }

        public string Recetehastakayit { get; set; }
        public string Recetehastakayitad { get; set; }
    }
}