//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace hastaportali.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TahlilSonuc
    {
        public string TahlilSonucId { get; set; }
        public string TahlilSonuc1 { get; set; }
        public System.DateTime TahlilSonucTarih { get; set; }
        public string E_imza { get; set; }
        public string TahlilSonuchastakayit { get; set; }
        public string TahilSonucDoktor { get; set; }
    
        public virtual Doktorlar Doktorlar { get; set; }
        public virtual HastaKayit HastaKayit { get; set; }
    }
}
