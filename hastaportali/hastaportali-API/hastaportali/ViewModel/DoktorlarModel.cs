using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hastaportali.ViewModel
{
    public class DoktorlarModel
    {
        public string DoktorKimlik { get; set; }
        public string DoktorAdSoyad { get; set; }
        public string DoktorTel { get; set; }
        public string DoktorE_mail { get; set; }
        public string DoktorTipDaliId { get; set; }
        public string DoktorFoto { get; set; }
        public string DoktorSifre { get; set; }
        public string TedaviAlanlarKimlik { get; set; }
        public string HastaAdSoyad { get; set; }
        public string HastaFoto { get; set; }
        public string TipDali { get; set; }
        public string randevular { get; set; }
        public string randevularTarih { get; set; }
        public Nullable<int> DoktorAdmin { get; set; }



        public RandevuModel RandevuTarih { get; set; }

        public HastaKayitModel TedaviAlanlar { get; set; }

        public TipdallariModel DoktorBolumu { get; set; }


    }
}