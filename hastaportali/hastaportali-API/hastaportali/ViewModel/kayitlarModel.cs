using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hastaportali.ViewModel
{
    public class kayitlarModel
    {
        public string kayitId { get; set; }
        public string kayitdoktorkimlik { get; set; }
        public string kayithastakimlik { get; set; }

        public DoktorlarModel Doktorveriler { get; set; }
        public HastaKayitModel Hastaveriler { get; set; }
    }
}