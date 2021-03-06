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
    
    public partial class HastaKayit
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HastaKayit()
        {
            this.Doktorlar = new HashSet<Doktorlar>();
            this.HastaBilgi = new HashSet<HastaBilgi>();
            this.kayitlar = new HashSet<kayitlar>();
            this.Randevu = new HashSet<Randevu>();
            this.Recete = new HashSet<Recete>();
            this.TahlilSonuc = new HashSet<TahlilSonuc>();
            this.Tipdallari1 = new HashSet<Tipdallari>();
        }
    
        public string HastaKimlik { get; set; }
        public string HastaAdSoyad { get; set; }
        public System.DateTime HastaDogumTarihi { get; set; }
        public string HastaE_posta { get; set; }
        public string HastaTelefon { get; set; }
        public string HastaFoto { get; set; }
        public string HastaSifre { get; set; }
        public string TedaviYapanDoktorKimlik { get; set; }
        public string HastaKayitBilgiId { get; set; }
        public string HastaTipDaliId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Doktorlar> Doktorlar { get; set; }
        public virtual Doktorlar Doktorlar1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<HastaBilgi> HastaBilgi { get; set; }
        public virtual HastaBilgi HastaBilgi1 { get; set; }
        public virtual Tipdallari Tipdallari { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<kayitlar> kayitlar { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Randevu> Randevu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Recete> Recete { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TahlilSonuc> TahlilSonuc { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tipdallari> Tipdallari1 { get; set; }
    }
}
