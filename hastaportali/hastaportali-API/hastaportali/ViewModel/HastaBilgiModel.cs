using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hastaportali.ViewModel
{
    public class HastaBilgiModel
    {
        public string HastaBilgiId { get; set; }
        public string Yas { get; set; }
        public string Uzunluk { get; set; }
        public string Agarlik { get; set; }
        public string KanGrubu { get; set; }
        public string Tansiyon { get; set; }
        public string Nabiz { get; set; }
        public string SolunumSayisi { get; set; }
        public string Sicaklik { get; set; }
        public string Diyet { get; set; }
        public string Alerji { get; set; }
        public System.DateTime OlcmeTarihi { get; set; }
        public string OlcmeYapanDoktorKimlik { get; set; }
        public string DoktorAdSoyad { get; set; }
        public string E_imza { get; set; }

        public string bilgiaitHastaKimlik { get; set; }
        public string bilgiaitHasta { get; set; }
    }
}