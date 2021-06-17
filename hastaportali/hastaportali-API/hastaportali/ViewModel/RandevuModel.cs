using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hastaportali.ViewModel
{
    public class RandevuModel
    {
        public string RandevuId { get; set; }
        public System.TimeSpan RandevuSaati { get; set; }
        public System.DateTime RandevuTarihi { get; set; }
        
        public string RandevuDoktorKimlik { get; set; }
        public string RandevuDoktorAdSoyad { get; set; }

        public string Randevuhastakayit { get; set; }
        public string Randevuhastakayitad { get; set; }

        public string RandevuTipDaliId { get; set; }
        public string RandevuTipDali { get; set; }




    }
}