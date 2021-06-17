using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace hastaportali.ViewModel
{
    public class OturumAcModel
    {
        public bool Oturumislem { get; set; }
        public string mesaj { get; set; }
        public DoktorlarModel OturumAc { get; set; }
        public HastaKayitModel Oturumac { get; set; }
    }
}