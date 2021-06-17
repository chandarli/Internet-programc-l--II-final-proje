using hastaportali.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using hastaportali.ViewModel;

namespace hastaportali.Auth
{
    public class DoktorService
    {
        db01Entities13 db = new db01Entities13();

        public DoktorlarModel doktorOturumacma(string kimlik , string sifre)
        {
            DoktorlarModel Doktorlar = db.Doktorlar.Where(s => s.DoktorKimlik == kimlik && s.DoktorSifre == sifre).Select(x => new DoktorlarModel()
            {

                DoktorKimlik = x.DoktorKimlik,
                DoktorAdSoyad = x.DoktorAdSoyad,
                DoktorTel = x.DoktorTel,
                DoktorE_mail = x.DoktorE_mail,
                DoktorTipDaliId = x.DoktorTipDaliId,
                DoktorFoto = x.DoktorFoto,
                DoktorSifre = x.DoktorSifre,

                TedaviAlanlarKimlik = x.HastaKayit.HastaKimlik,
                HastaAdSoyad = x.HastaKayit.HastaAdSoyad,
                HastaFoto = x.HastaKayit.HastaFoto,

                TipDali = x.Tipdallari.TipDali,

                randevular = x.Randevu.RandevuId,

                DoktorAdmin = x.DoktorAdmin,

            }).FirstOrDefault();
            return Doktorlar;
        }
    }
}