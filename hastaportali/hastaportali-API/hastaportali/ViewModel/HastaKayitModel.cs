using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hastaportali.ViewModel
{
    public class HastaKayitModel
    {
        public string HastaKimlik { get; set; }
        public string HastaAdSoyad { get; set; }
        public System.DateTime HastaDogumTarihi { get; set; }
        public string HastaE_posta { get; set; }
        public string HastaTelefon { get; set; }
        public string HastaFoto { get; set; }
        public string HastaSifre { get; set; }

        public string TedaviYapanDoktorKimlik { get; set; }
        public string TedaviYapanDoktorad { get; set; }

        public string HastaKayitBilgiId { get; set; }
        public string TipDali { get; set; }
        public string TipDallar { get; set; }
        public string HastaTipDaliId { get; set; }


        public DoktorlarModel DoktorKimlik { get; set; }

        public HastaBilgiModel HastaBilgiler { get; set; }
    }
}