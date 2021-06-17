using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hastaportali.ViewModel
{
    public class TahlilSonucModel
    {
        public string TahlilSonucId { get; set; }
        public string TahlilSonuc1 { get; set; }
        public System.DateTime TahlilSonucTarih { get; set; }
        public string E_imza { get; set; }

        public string TahlilSonuchastakayit { get; set; }
        public string TahlilSonuchastakayitad { get; set; }

        public string TahilSonucDoktor { get; set; }
        public string TahilSonucDoktorad { get; set; }
    }
}