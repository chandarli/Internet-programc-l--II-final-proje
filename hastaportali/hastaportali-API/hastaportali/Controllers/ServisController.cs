using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using hastaportali.Models;
using hastaportali.ViewModel;
using hastaportali.Controllers;





namespace hastaportali.Controllers
{
    [Authorize]
    
    public class ServisController : ApiController
    {
        db01Entities13 db = new db01Entities13();
        SonucModel sonuc = new SonucModel();
        Random random = new Random();

        #region Doktorlar

        [HttpGet]
        [Route("api/Doktorlarliste")]

        public List<DoktorlarModel> Doktorlar()
        {
            List<DoktorlarModel> liste = db.Doktorlar.Select(x => new DoktorlarModel()
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
                
                randevular=x.Randevu.RandevuId,
                DoktorAdmin = x.DoktorAdmin,



            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/Doktorlarbykimlik1/{DoktorKimlik}")]

        public DoktorlarModel Doktorlarbykimlik1(string DoktorKimlik)
        {
            DoktorlarModel kayit = db.Doktorlar.Where(s => s.DoktorKimlik == DoktorKimlik).Select(x => new DoktorlarModel()
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

            return kayit;

        }

        [HttpGet]
        [Route("api/DoktorlarHastaKayitlarListe/{HastaKimlik}")]

        public List<DoktorlarModel> DoktorlarHastaKayitlarListe(string HastaKimlik)
        {

            List<DoktorlarModel> liste = db.Doktorlar.Where(s => s.TedaviAlanlarKimlik == HastaKimlik).Select(x => new DoktorlarModel()
            {
                DoktorKimlik = x.DoktorKimlik,
                DoktorAdSoyad = x.DoktorAdSoyad,
                DoktorTel = x.DoktorTel,
                DoktorE_mail = x.DoktorE_mail,
                DoktorTipDaliId = x.DoktorTipDaliId,
                DoktorFoto = x.DoktorFoto,
                DoktorSifre = x.DoktorSifre,
                TedaviAlanlarKimlik = x.TedaviAlanlarKimlik,
                TipDali = x.Tipdallari.TipDali,
                randevular = x.randevular,

                HastaAdSoyad = x.HastaKayit.HastaAdSoyad,
                HastaFoto = x.HastaKayit.HastaFoto,

                DoktorAdmin = x.DoktorAdmin,



            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.TedaviAlanlar = HastaKayitbykimlik(kayit.TedaviAlanlarKimlik);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/DoktorlarTipDallariListe/{TipDaliId}")]

        public List<DoktorlarModel> DoktorlarTipDallariListe(string TipDaliId)
        {

            List<DoktorlarModel> liste = db.Doktorlar.Where(s => s.DoktorTipDaliId == TipDaliId).Select(x => new DoktorlarModel()
            {
                DoktorKimlik = x.DoktorKimlik,
                DoktorAdSoyad = x.DoktorAdSoyad,
                DoktorTel = x.DoktorTel,
                DoktorE_mail = x.DoktorE_mail,
                DoktorTipDaliId = x.DoktorTipDaliId,
                DoktorFoto = x.DoktorFoto,
                DoktorSifre = x.DoktorSifre,
                TedaviAlanlarKimlik = x.TedaviAlanlarKimlik,
                HastaAdSoyad = x.HastaKayit.HastaAdSoyad,


                HastaFoto = x.HastaKayit.HastaFoto,

                TipDali = x.Tipdallari.TipDali,

                randevular = x.Randevu.RandevuId,

                DoktorAdmin = x.DoktorAdmin,

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.DoktorBolumu = TipdallaribyId(kayit.DoktorTipDaliId);
            }

            return liste;
        }



        [HttpGet]
        [Route("api/DoktorOturumAc")]

        
        public OturumAcModel DoktorOturumAc(string DoktorKimlik ,string DoktorSifre)
        {
            OturumAcModel oturumAc = new OturumAcModel();
            if (db.Doktorlar.Count(x=>x.DoktorKimlik==DoktorKimlik && x.DoktorSifre== DoktorSifre) > 0)
            {
                DoktorlarModel doktorlar = db.Doktorlar.Where(x => x.DoktorKimlik == DoktorKimlik).Select(z => new DoktorlarModel()
                {
                    DoktorKimlik = z.DoktorKimlik,
                    DoktorAdSoyad = z.DoktorAdSoyad,
                    DoktorTel = z.DoktorTel,
                    DoktorE_mail = z.DoktorE_mail,
                    DoktorTipDaliId = z.DoktorTipDaliId,
                    DoktorFoto = z.DoktorFoto,
                    DoktorSifre = z.DoktorSifre,
                    TedaviAlanlarKimlik = z.TedaviAlanlarKimlik,
                    HastaAdSoyad = z.HastaKayit.HastaAdSoyad,
                    

                }).SingleOrDefault();

                oturumAc.Oturumislem = true;
                oturumAc.mesaj = "Oturum Basariyla acildi Doktor";
                
                oturumAc.OturumAc = doktorlar;
                return oturumAc;

            }
            
            else if (db.Doktorlar.Count(x=>x.DoktorKimlik==DoktorKimlik || x.DoktorSifre==DoktorSifre) > 0)
            
            {
                oturumAc.Oturumislem = false;
                oturumAc.mesaj = "doktor kimlik ya da doktor sifre yanlistir";
                return oturumAc;
            }

            else
            {
                oturumAc.Oturumislem = false;
                oturumAc.mesaj = "doktor kimlik bulunamadi";
                return oturumAc;
            }
    
        }

        [HttpPost]
        [Route("api/Doktorlarekle")]

        public SonucModel DoktorlarEkle(DoktorlarModel model)
        {
            
                if (db.Doktorlar.Count(s => s.DoktorKimlik == model.DoktorKimlik) > 0)
                {
                    sonuc.islem = false;
                    sonuc.mesaj = "Girilen Doktor Kimlik kayıtlıdır";
                    return sonuc;
                }

                //if(db.Doktorlar.Count(s=> s.DoktorSifre == model.DoktorSifre ) > 0)
                //{
                //    sonuc.islem = false;
                //    sonuc.mesaj = "Girilen Doktor sifresi kayıtlıdır";
                //    return sonuc;
                //}

                Doktorlar yeni = new Doktorlar();

                yeni.DoktorKimlik = random.Next(100000000, 199999999).ToString();
                yeni.DoktorAdSoyad = model.DoktorAdSoyad;
                yeni.DoktorTel = model.DoktorTel;
                yeni.DoktorE_mail = model.DoktorE_mail;
                yeni.DoktorTipDaliId = model.DoktorTipDaliId;
                yeni.DoktorFoto = model.DoktorFoto;
                yeni.DoktorSifre = model.DoktorSifre;
                yeni.TedaviAlanlarKimlik = model.TedaviAlanlarKimlik;
                yeni.randevular = model.randevular;

                yeni.DoktorAdmin = model.DoktorAdmin;



                db.Doktorlar.Add(yeni);
                db.SaveChanges();
                sonuc.islem = true;
                sonuc.mesaj = "Yeni Doktor Kayıdı eklendi";

                return sonuc;
            
         
            
        }


        [HttpPut]
        [Route("api/Doktorlarduzenle")]

        public SonucModel Doktorlarduzenle(DoktorlarModel model)
        {
            Doktorlar kayit = db.Doktorlar.Where(s => s.DoktorKimlik == model.DoktorKimlik).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Doktor Kimlik Bulunamadi";
                return sonuc;
            }


            kayit.DoktorAdSoyad = model.DoktorAdSoyad;
            kayit.DoktorTel = model.DoktorTel;
            kayit.DoktorE_mail = model.DoktorE_mail;
            kayit.DoktorTipDaliId = model.TipDali;
            kayit.DoktorFoto = model.DoktorFoto;
            kayit.DoktorSifre = model.DoktorSifre;
            kayit.TedaviAlanlarKimlik = model.TedaviAlanlarKimlik;
            kayit.randevular = model.randevular;
            kayit.DoktorTipDaliId = model.DoktorTipDaliId;

            kayit.DoktorAdmin = model.DoktorAdmin;


            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Doktor Kayıdı Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/Doktorlarsil/{DoktorKimlik}")]

        public SonucModel Doktorlarsil(string DoktorKimlik)
        {
            Doktorlar kayit = db.Doktorlar.Where(s => s.DoktorKimlik == DoktorKimlik).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Doktor Kimlik Bulunamadi";
                return sonuc;
            }

            if (db.HastaBilgi.Count(z => z.OlcmeYapanDoktorKimlik == DoktorKimlik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Doktor Kimliğe kayıtlı Hasta Bilgileri  olduğu için silinemez ";
                return sonuc;
            }

            if(db.Randevu.Count(z=>z.RandevuDoktorKimlik == DoktorKimlik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Doktor Kimliğe kayıtlı Randevu olduğu için silinemez ";
                return sonuc;
            }

            db.Doktorlar.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Doktor Kayıdı Silindi";
            return sonuc;
        }



        #endregion

        #region HastaBilgil


        [HttpGet]
        [Route("api/hastabilgiliste")]

        public List<HastaBilgiModel> HastaBilgi()
        {
            List<HastaBilgiModel> liste = db.HastaBilgi.Select(x => new HastaBilgiModel()
            {
                HastaBilgiId = x.HastaBilgiId,
                Yas = x.Yas,
                Uzunluk = x.Uzunluk,
                Agarlik = x.Agarlik,
                KanGrubu = x.KanGrubu,
                Tansiyon = x.Tansiyon,
                Nabiz = x.Nabiz,
                SolunumSayisi = x.SolunumSayisi,
                Sicaklik = x.Sicaklik,
                Diyet = x.Diyet,
                Alerji = x.Alerji,
                OlcmeTarihi = x.OlcmeTarihi,
                E_imza = x.E_imza,

                OlcmeYapanDoktorKimlik = x.Doktorlar.DoktorKimlik,
                DoktorAdSoyad=x.Doktorlar.DoktorAdSoyad,
                
                bilgiaitHastaKimlik=x.HastaKayit.HastaKimlik,
                bilgiaitHasta=x.HastaKayit.HastaAdSoyad,
                

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/HastaBilgibyid/{HastaBilgiId}")]

        public HastaBilgiModel HastaBilgibyId(string HastaBilgiId)
        {
            HastaBilgiModel kayit = db.HastaBilgi.Where(s => s.HastaBilgiId == HastaBilgiId).Select(x => new HastaBilgiModel()
            {
                HastaBilgiId = x.HastaBilgiId,
                Yas = x.Yas,
                Uzunluk = x.Uzunluk,
                Agarlik = x.Agarlik,
                KanGrubu = x.KanGrubu,
                Tansiyon = x.Tansiyon,
                Nabiz = x.Nabiz,
                SolunumSayisi = x.SolunumSayisi,
                Sicaklik = x.Sicaklik,
                Diyet = x.Diyet,
                Alerji = x.Alerji,
                OlcmeTarihi = x.OlcmeTarihi,
                E_imza =x.E_imza,

                OlcmeYapanDoktorKimlik = x.Doktorlar.DoktorKimlik,
                DoktorAdSoyad = x.Doktorlar.DoktorAdSoyad,

                bilgiaitHastaKimlik = x.HastaKayit.HastaKimlik,
                bilgiaitHasta = x.HastaKayit.HastaAdSoyad,

            }).FirstOrDefault();

            return kayit;
        }
        [HttpPost]
        [Route("api/hastabilgiekle")]

        public SonucModel HastaBilgiEkle(HastaBilgiModel model)
        {
            if (db.HastaBilgi.Count(s => s.HastaBilgiId == model.HastaBilgiId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta Id kayıtlıdır";
                return sonuc;
            }

            if (db.HastaBilgi.Count(s =>s.E_imza==model.E_imza)>0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta E-imza kayıtlıdır , E-imza tekrarilamaz";
                return sonuc;
            }

            HastaBilgi yeni = new HastaBilgi();

            yeni.HastaBilgiId = random.Next(200000000, 299999999).ToString();
            yeni.Yas = model.Yas;
            yeni.Uzunluk = model.Uzunluk;
            yeni.Agarlik = model.Agarlik;
            yeni.KanGrubu = model.KanGrubu;
            yeni.Tansiyon = model.Tansiyon;
            yeni.Nabiz = model.Nabiz;
            yeni.SolunumSayisi = model.SolunumSayisi;
            yeni.Sicaklik = model.Sicaklik;
            yeni.Diyet = model.Diyet;
            yeni.Alerji = model.Alerji;
            yeni.OlcmeTarihi = model.OlcmeTarihi;
            yeni.OlcmeYapanDoktorKimlik  = model.OlcmeYapanDoktorKimlik;
            yeni.E_imza = Guid.NewGuid().ToString();

            yeni.bilgiaitHastaKimlik = model.bilgiaitHastaKimlik;
            

            db.HastaBilgi.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Hasta Kayıdı eklendi";

            return sonuc;
        }


        [HttpPut]
        [Route("api/hastabilgiduzenle")]

        public SonucModel hastabilgiduzenle(HastaBilgiModel model)
        {
            HastaBilgi kayit = db.HastaBilgi.Where(s => s.HastaBilgiId == model.HastaBilgiId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta Id Bulunamadi";
                return sonuc;
            }

            kayit.HastaBilgiId = model.HastaBilgiId;
            kayit.Yas = model.Yas;
            kayit.Uzunluk = model.Uzunluk;
            kayit.Agarlik = model.Agarlik;
            kayit.KanGrubu = model.KanGrubu;
            kayit.Tansiyon = model.Tansiyon;
            kayit.Nabiz = model.Nabiz;
            kayit.SolunumSayisi = model.SolunumSayisi;
            kayit.Sicaklik = model.Sicaklik;
            kayit.Diyet = model.Diyet;
            kayit.Alerji = model.Alerji;
            kayit.OlcmeTarihi = model.OlcmeTarihi;
            kayit.E_imza = Guid.NewGuid().ToString();

            kayit.OlcmeYapanDoktorKimlik = model.OlcmeYapanDoktorKimlik;
  
            kayit.bilgiaitHastaKimlik = model.bilgiaitHastaKimlik;
           

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Hasta Kayıdı Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/hastabilgisil/{HastaBilgiId}")]

        public SonucModel hastabilgisil(string HastaBilgiId)
        {
            HastaBilgi kayit = db.HastaBilgi.Where(s => s.HastaBilgiId == HastaBilgiId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta Id Bulunamadi";
                return sonuc;
            }

            if (db.HastaKayit.Count(z => z.HastaKayitBilgiId == HastaBilgiId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta Id'e kayıtlı Hasta olduğu için silinemez ";
                return sonuc;
            }

            db.HastaBilgi.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Hasta Kayıdı Silindi";
            return sonuc;
        }

        #endregion

        #region HastaKayit

        [HttpGet]
        [Route("api/hastakayitliste")]

        public List<HastaKayitModel> HastaKayit()
        {
            List<HastaKayitModel> liste = db.HastaKayit.Select(x => new HastaKayitModel()
            {
                HastaKimlik = x.HastaKimlik,
                HastaAdSoyad = x.HastaAdSoyad,
                HastaDogumTarihi = x.HastaDogumTarihi,
                HastaE_posta = x.HastaE_posta,
                HastaFoto = x.HastaFoto,
                HastaTelefon = x.HastaTelefon,
                HastaKayitBilgiId = x.HastaKayitBilgiId,
                HastaSifre = x.HastaSifre,

                TedaviYapanDoktorKimlik = x.Doktorlar1.DoktorKimlik,
                TedaviYapanDoktorad = x.Doktorlar1.DoktorAdSoyad,

                HastaTipDaliId = x.Tipdallari.TipDaliId,
                TipDali=x.Tipdallari.TipDali,

               
                


            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/HastaKayitbykimlik/{HastaKimlik}")]

        public HastaKayitModel HastaKayitbykimlik(string HastaKimlik)
        {
            HastaKayitModel kayit = db.HastaKayit.Where(s => s.HastaKimlik == HastaKimlik).Select(x => new HastaKayitModel()
            {
                HastaKimlik = x.HastaKimlik,
                HastaAdSoyad = x.HastaAdSoyad,
                HastaDogumTarihi = x.HastaDogumTarihi,
                HastaE_posta = x.HastaE_posta,
                HastaFoto = x.HastaFoto,
                HastaTelefon = x.HastaTelefon,
                HastaKayitBilgiId = x.HastaKayitBilgiId,
                HastaSifre = x.HastaSifre,

                TedaviYapanDoktorKimlik = x.Doktorlar1.DoktorKimlik,
                TedaviYapanDoktorad = x.Doktorlar1.DoktorAdSoyad,

                HastaTipDaliId = x.Tipdallari.TipDaliId,
                TipDali = x.Tipdallari.TipDali,


            }).FirstOrDefault();

            return kayit;
        }

        [HttpGet]
        [Route("api/HastaKayitbykimlik1/{HastaKimlik}")]

        public List<HastaKayitModel> HastaKayitbykimlik1(string HastaKimlik)
        {

            List<HastaKayitModel> liste = db.HastaKayit.Where(s => s.HastaKimlik == HastaKimlik).Select(x => new HastaKayitModel()
            {
                HastaKimlik = x.HastaKimlik,
                HastaAdSoyad = x.HastaAdSoyad,
                HastaDogumTarihi = x.HastaDogumTarihi,
                HastaE_posta = x.HastaE_posta,
                HastaFoto = x.HastaFoto,
                HastaTelefon = x.HastaTelefon,
                HastaKayitBilgiId = x.HastaKayitBilgiId,
                HastaSifre = x.HastaSifre,

                TedaviYapanDoktorKimlik = x.Doktorlar1.DoktorKimlik,
                TedaviYapanDoktorad = x.Doktorlar1.DoktorAdSoyad,

                HastaTipDaliId = x.Tipdallari.TipDaliId,
                TipDali = x.Tipdallari.TipDali,


            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.HastaBilgiler = HastaBilgibyId(kayit.HastaKayitBilgiId);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/HastaOturumAc")]


        public OturumAcModel HastaOturumAc(string HastaKimlik, string HastaSifre)
        {
            OturumAcModel oturumAc = new OturumAcModel();
            if (db.HastaKayit.Count(x => x.HastaKimlik == HastaKimlik && x.HastaSifre == HastaSifre) > 0)
            {
                HastaKayitModel HastaKayit = db.HastaKayit.Where(x => x.HastaKimlik == HastaKimlik).Select(z => new HastaKayitModel()
                {
                    HastaKimlik = z.HastaKimlik,
                    HastaAdSoyad = z.HastaAdSoyad,
                    HastaDogumTarihi = z.HastaDogumTarihi,
                    HastaE_posta = z.HastaE_posta,
                    HastaFoto = z.HastaFoto,
                    HastaTelefon = z.HastaTelefon,
                    HastaKayitBilgiId = z.HastaKayitBilgiId,

                    TipDali = z.Tipdallari.TipDali,
                    HastaSifre = z.HastaSifre

                }).SingleOrDefault();

                oturumAc.Oturumislem = true;
                oturumAc.mesaj = "Oturum Basariyla acildi Hasta";

                oturumAc.Oturumac = HastaKayit;
                return oturumAc;

            }

            else if (db.HastaKayit.Count(x => x.HastaKimlik == HastaKimlik || x.HastaSifre == HastaSifre) > 0)

            {
                oturumAc.Oturumislem = false;
                oturumAc.mesaj = "Hasta kimlik ya da Hasta sifre yanlistir";
                return oturumAc;
            }

            else
            {
                oturumAc.Oturumislem = false;
                oturumAc.mesaj = "Hasta kimlik bulunamadi";
                return oturumAc;
            }

        }



        [HttpPost]
        [Route("api/hastaKayitekle")]

        public SonucModel HastaKayitEkle(HastaKayitModel model)
        {
            if (db.HastaKayit.Count(s => s.HastaKimlik == model.HastaKimlik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta Kimlik kayıtlıdır";
                return sonuc;
            }

            HastaKayit yeni = new HastaKayit();

            yeni.HastaKimlik = random.Next(300000000, 399999999).ToString(); ;
            yeni.HastaAdSoyad = model.HastaAdSoyad;
            yeni.HastaDogumTarihi = model.HastaDogumTarihi;
            yeni.HastaE_posta = model.HastaE_posta;
            yeni.HastaFoto = model.HastaFoto;
            yeni.HastaTelefon = model.HastaTelefon;
            yeni.HastaKayitBilgiId = model.HastaKayitBilgiId;
            yeni.TedaviYapanDoktorKimlik = model.TedaviYapanDoktorKimlik;
            yeni.HastaSifre = model.HastaSifre;
            yeni.HastaTipDaliId = model.HastaTipDaliId;

            db.HastaKayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Hasta Kayıdı eklendi";

            return sonuc;
        }


        [HttpPut]
        [Route("api/hastaKayitduzenle")]

        public SonucModel hastaKayitduzenle(HastaKayitModel model)
        {
            HastaKayit kayit = db.HastaKayit.Where(s => s.HastaKimlik == model.HastaKimlik).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta Kimlik Bulunamadi";
                return sonuc;
            }

            kayit.HastaKimlik = model.HastaKimlik;
            kayit.HastaAdSoyad = model.HastaAdSoyad;
            kayit.HastaDogumTarihi = model.HastaDogumTarihi;
            kayit.HastaE_posta = model.HastaE_posta;
            kayit.HastaFoto = model.HastaFoto;
            kayit.HastaTelefon = model.HastaTelefon;
            kayit.HastaKayitBilgiId = model.HastaKayitBilgiId;
            kayit.HastaSifre = model.HastaSifre;

            kayit.TedaviYapanDoktorKimlik = model.TedaviYapanDoktorKimlik;

            kayit.HastaTipDaliId = model.HastaTipDaliId;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Hasta Kayıdı Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/hastaKayitsil/{HastaKimlik}")]

        public SonucModel hastaKayitsil(string HastaKimlik)
        {
            HastaKayit kayit = db.HastaKayit.Where(s => s.HastaKimlik == HastaKimlik).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta Kimlik Bulunamadi";
                return sonuc;
            }

            if (db.Doktorlar.Count(z => z.TedaviAlanlarKimlik == HastaKimlik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Hasta Kimliğe kayıtlı Tedavi alan Kimlik olduğu için kayıt silinemez";
                return sonuc;
            }
            db.HastaKayit.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Hasta Kayıdı Silindi";
            return sonuc;
        }

        #endregion

        #region Randevu

        [HttpGet]
        [Route("api/Randevuliste")]

        public List<RandevuModel> Randevu()
        {
            List<RandevuModel> liste = db.Randevu.Select(x => new RandevuModel()
            {
                RandevuId = x.RandevuId,
                RandevuSaati = x.RandevuSaati,
                RandevuTarihi = x.RandevuTarihi,

                RandevuDoktorKimlik = x.Doktorlar1.DoktorKimlik,
                RandevuDoktorAdSoyad = x.Doktorlar1.DoktorAdSoyad,

                Randevuhastakayit = x.HastaKayit.HastaKimlik,
                Randevuhastakayitad =x.HastaKayit.HastaAdSoyad,

                RandevuTipDaliId=x.Tipdallari.TipDaliId,
                RandevuTipDali=x.Tipdallari.TipDali,




            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/RandevubyId/{RandevuId}")]

        public RandevuModel RandevubyId(string RandevuId)
        {
            RandevuModel kayit = db.Randevu.Where(s => s.RandevuId == RandevuId).Select(x => new RandevuModel()
            {
                RandevuId = x.RandevuId,
                RandevuSaati = x.RandevuSaati,
                RandevuTarihi = x.RandevuTarihi,

                RandevuDoktorKimlik = x.Doktorlar1.DoktorKimlik,
                RandevuDoktorAdSoyad = x.Doktorlar1.DoktorAdSoyad,

                Randevuhastakayit = x.HastaKayit.HastaKimlik,
                Randevuhastakayitad = x.HastaKayit.HastaAdSoyad,

                RandevuTipDaliId = x.Tipdallari.TipDaliId,
                RandevuTipDali = x.Tipdallari.TipDali,



            }).FirstOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/Randevuekle")]

        public SonucModel RandevuEkle(RandevuModel model)
        {
            if (db.Randevu.Count(s => s.RandevuId == model.RandevuId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Randevu Id kayıtlıdır";
                return sonuc;
            }

            Randevu yeni = new Randevu();

            yeni.RandevuId = random.Next(400000000, 499999999).ToString(); ;
            yeni.RandevuSaati = model.RandevuSaati;
            yeni.RandevuTarihi = model.RandevuTarihi;

            yeni.Randevuhastakayit = model.Randevuhastakayit;


            yeni.RandevuDoktorKimlik = model.RandevuDoktorKimlik;


            yeni.RandevuTipDaliId = model.RandevuTipDaliId;


            db.Randevu.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Randevu Kayıdı eklendi";

            return sonuc;
        }


        [HttpPut]
        [Route("api/Randevuduzenle")]

        public SonucModel Randevuduzenle(RandevuModel model)
        {
            Randevu kayit = db.Randevu.Where(s => s.RandevuId == model.RandevuId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Randevu Id Bulunamadi";
                return sonuc;
            }
            kayit.RandevuId = model.RandevuId;
            kayit.RandevuSaati = model.RandevuSaati;
            kayit.RandevuTarihi = model.RandevuTarihi;

            kayit.Randevuhastakayit = model.Randevuhastakayit;

            kayit.RandevuDoktorKimlik = model.RandevuDoktorKimlik;

            kayit.RandevuTipDaliId = model.RandevuTipDaliId;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Randevu Kayıdı Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/Randevusil/{RandevuId}")]

        public SonucModel Randevusil(string RandevuId)
        {
            Randevu kayit = db.Randevu.Where(s => s.RandevuId == RandevuId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Randevu Id Bulunamadi";
                return sonuc;
            }

            db.Randevu.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Randevu Kayıdı Silindi";
            return sonuc;
        }

        #endregion

        #region Recete

        [HttpGet]
        [Route("api/Receteliste")]

        public List<ReceteModel> Recete()
        {
            List<ReceteModel> liste = db.Recete.Select(x => new ReceteModel()
            {
                ReceteId = x.ReceteId,
                IlacAdi = x.IlacAdi,
                Miktarlar = x.Miktarlar,
                Doz = x.Doz,
                Sure = x.Sure,
                ReceteTarih = x.ReceteTarih,
                E_imza = x.E_imza,

                Recetehastakayit = x.HastaKayit.HastaKimlik,
                Recetehastakayitad=x.HastaKayit.HastaAdSoyad,

                Recetedoktorkimlik = x.Doktorlar.DoktorKimlik,
                Recetedoktorad =x.Doktorlar.DoktorAdSoyad,

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/RecetebyId/{ReceteId}")]

        public ReceteModel RecetebyId(string ReceteId)
        {
            ReceteModel kayit = db.Recete.Where(s => s.ReceteId == ReceteId).Select(x => new ReceteModel()
            {
                ReceteId = x.ReceteId,
                IlacAdi = x.IlacAdi,
                Miktarlar = x.Miktarlar,
                Doz = x.Doz,
                Sure = x.Sure,
                ReceteTarih = x.ReceteTarih,
                E_imza = x.E_imza,

                Recetehastakayit = x.HastaKayit.HastaKimlik,
                Recetehastakayitad = x.HastaKayit.HastaAdSoyad,

                Recetedoktorkimlik = x.Doktorlar.DoktorKimlik,
                Recetedoktorad = x.Doktorlar.DoktorAdSoyad,

            }).FirstOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/Receteekle")]

        public SonucModel ReceteEkle(ReceteModel model)
        {
            if (db.Recete.Count(s => s.ReceteId == model.ReceteId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Recete Id kayıtlıdır";
                return sonuc;
            }

            if (db.Recete.Count(s => s.E_imza == model.E_imza) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen E-imza kayıtlıdır, E-imza tekrarilamaz";
                return sonuc;
            }

            Recete yeni = new Recete();

            yeni.ReceteId = random.Next(600000000, 699999999).ToString(); ;
            yeni.IlacAdi = model.IlacAdi;
            yeni.Miktarlar = model.Miktarlar;
            yeni.Doz = model.Doz;
            yeni.Sure = model.Sure;
            yeni.ReceteTarih = model.ReceteTarih;
            yeni.E_imza = Guid.NewGuid().ToString();

            yeni.Recetehastakayit = model.Recetehastakayit;

            yeni.Recetedoktorkimlik = model.Recetedoktorkimlik;



            db.Recete.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Recete Kayıdı eklendi";

            return sonuc;
        }


        [HttpPut]
        [Route("api/Receteduzenle")]

        public SonucModel Receteduzenle(ReceteModel model)
        {
            Recete kayit = db.Recete.Where(s => s.ReceteId == model.ReceteId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Recete ID Bulunamadi";
                return sonuc;
            }

            kayit.ReceteId = model.ReceteId;
            kayit.IlacAdi = model.IlacAdi;
            kayit.Miktarlar = model.Miktarlar;
            kayit.Doz = model.Doz;
            kayit.Sure = model.Sure;
            kayit.ReceteTarih = model.ReceteTarih;
            kayit.E_imza = Guid.NewGuid().ToString();

            kayit.Recetedoktorkimlik = model.Recetedoktorkimlik;

            kayit.Recetehastakayit = model.Recetehastakayit;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Recete Id Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/Recetesil/{ReceteId}")]

        public SonucModel Recetesil(string ReceteId)
        {
            Recete kayit = db.Recete.Where(s => s.ReceteId == ReceteId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Recete Id Bulunamadi";
                return sonuc;
            }

            db.Recete.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Recete Kayıdı Silindi";
            return sonuc;
        }

        #endregion

        #region TahlilSonuc

        [HttpGet]
        [Route("api/TahlilSonucliste")]

        public List<TahlilSonucModel> TahlilSonuc()
        {
            List<TahlilSonucModel> liste = db.TahlilSonuc.Select(x => new TahlilSonucModel()
            {
 
               TahlilSonucId=x.TahlilSonucId,
               TahlilSonuc1=x.TahlilSonuc1,
               TahlilSonucTarih=x.TahlilSonucTarih,
               E_imza=x.E_imza,

               TahlilSonuchastakayit=x.HastaKayit.HastaKimlik,
               TahlilSonuchastakayitad=x.HastaKayit.HastaAdSoyad,

               TahilSonucDoktor=x.Doktorlar.DoktorKimlik,
               TahilSonucDoktorad=x.Doktorlar.DoktorAdSoyad,

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/TahlilSonucbyId/{TahlilSonucId}")]

        public TahlilSonucModel TahlilSonucbyId(string TahlilSonucId)
        {
            TahlilSonucModel kayit = db.TahlilSonuc.Where(s => s.TahlilSonucId == TahlilSonucId).Select(x => new TahlilSonucModel()
            {
                TahlilSonucId = x.TahlilSonucId,
                TahlilSonuc1 = x.TahlilSonuc1,
                TahlilSonucTarih = x.TahlilSonucTarih,
                E_imza = x.E_imza,

                TahlilSonuchastakayit = x.HastaKayit.HastaKimlik,
                TahlilSonuchastakayitad = x.HastaKayit.HastaAdSoyad,

                TahilSonucDoktor = x.Doktorlar.DoktorKimlik,
                TahilSonucDoktorad = x.Doktorlar.DoktorAdSoyad,

            }).FirstOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/TahlilSonucekle")]

        public SonucModel TahlilSonucEkle(TahlilSonucModel model)
        {
            if (db.TahlilSonuc.Count(s => s.TahlilSonucId == model.TahlilSonucId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Tahlil Sonuc Id kayıtlıdır";
                return sonuc;
            }

            if (db.TahlilSonuc.Count(s => s.E_imza == model.E_imza) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen E-imza kayıtlıdır, E-imza tekrarilamaz";
                return sonuc;
            }

            TahlilSonuc yeni = new TahlilSonuc();

            yeni.TahlilSonucId = random.Next(700000000, 799999999).ToString(); ;
            yeni.TahlilSonuc1 = model.TahlilSonuc1;
            yeni.TahlilSonucTarih = model.TahlilSonucTarih;
            yeni.E_imza = Guid.NewGuid().ToString();
            yeni.TahlilSonuchastakayit = model.TahlilSonuchastakayit;
            yeni.TahilSonucDoktor = model.TahilSonucDoktor;
            db.TahlilSonuc.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Tahlil Sonuc Kayıdı eklendi";

            return sonuc;
        }


        [HttpPut]
        [Route("api/TahlilSonucduzenle")]

        public SonucModel TahlilSonucduzenle(TahlilSonucModel model)
        {
            TahlilSonuc kayit = db.TahlilSonuc.Where(s => s.TahlilSonucId == model.TahlilSonucId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Tahlil Sonuc ID Bulunamadi";
                return sonuc;
            }

            kayit.TahlilSonucId = model.TahlilSonucId;
            kayit.TahlilSonuc1 = model.TahlilSonuc1;
            kayit.TahlilSonucTarih = model.TahlilSonucTarih;
            kayit.E_imza = Guid.NewGuid().ToString();

            kayit.TahlilSonuchastakayit = model.TahlilSonuchastakayit;

            kayit.TahilSonucDoktor = model.TahilSonucDoktor;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Tahlil Sonuc Id Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/TahlilSonucsil/{TahlilSonucId}")]

        public SonucModel TahlilSonucsil(string TahlilSonucId)
        {
            TahlilSonuc kayit = db.TahlilSonuc.Where(s => s.TahlilSonucId == TahlilSonucId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Tahlil Sonuc Id Bulunamadi";
                return sonuc;
            }

            db.TahlilSonuc.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Tahlil Sonuc Kayıdı Silindi";
            return sonuc;
        }

        #endregion

        #region TipDallari

        [HttpGet]
        [Route("api/Tipdallariliste")]

        public List<TipdallariModel> Tipdallari()
        {
            List<TipdallariModel> liste = db.Tipdallari.Select(x => new TipdallariModel()
            {
                TipDaliId=x.TipDaliId,
                TipDali=x.TipDali,

                TipDalihastakayit=x.HastaKayit1.HastaKimlik,
                TipDalihastakayitad=x.HastaKayit1.HastaAdSoyad,

                TipDaliDoktor = x.Doktorlar1.DoktorKimlik,
                TipDaliDoktorad=x.Doktorlar1.DoktorAdSoyad,

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/TipdallaribyId/{TipDaliId}")]

        public TipdallariModel TipdallaribyId(string TipDaliId)
        {
            TipdallariModel kayit = db.Tipdallari.Where(s => s.TipDaliId == TipDaliId).Select(x => new TipdallariModel()
            {
                TipDaliId = x.TipDaliId,
                TipDali=x.TipDali,

                TipDalihastakayit = x.HastaKayit1.HastaKimlik,
                TipDalihastakayitad = x.HastaKayit1.HastaAdSoyad,

                TipDaliDoktor = x.Doktorlar1.DoktorKimlik,
                TipDaliDoktorad = x.Doktorlar1.DoktorAdSoyad,

            }).FirstOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/Tipdallariekle")]

        public SonucModel TipdallariEkle(TipdallariModel model)
        {
            if (db.Tipdallari.Count(s => s.TipDaliId == model.TipDaliId && s.TipDali==model.TipDali) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Tip Dalı Id kayıtlıdır";
                return sonuc;
            }

            Tipdallari yeni = new Tipdallari();

            yeni.TipDaliId = random.Next(800000000, 899999999).ToString(); ;
            yeni.TipDali = model.TipDali;
            yeni.TipDalihastakayit = model.TipDalihastakayit;
            yeni.TipDaliDoktor = model.TipDaliDoktor;
            

            db.Tipdallari.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Tip Dalı Kayıdı eklendi";

            return sonuc;
        }


        [HttpPut]
        [Route("api/Tipdallariduzenle")]

        public SonucModel Tipdallariduzenle(TipdallariModel model)
        {
            Tipdallari kayit = db.Tipdallari.Where(s => s.TipDaliId == model.TipDaliId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Tip Dalı Id Bulunamadi";
                return sonuc;
            }

            kayit.TipDaliId = model.TipDaliId;
            kayit.TipDali = model.TipDali;

            kayit.TipDalihastakayit = model.TipDalihastakayit;

            kayit.TipDaliDoktor = model.TipDaliDoktor;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Tip Dalı Id Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/Tipdallarisil/{TipDaliId}")]

        public SonucModel Tipdallarisil(string TipDaliId)
        {
            Tipdallari kayit = db.Tipdallari.Where(s => s.TipDaliId == TipDaliId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Tip Dalı Id Bulunamadi";
                return sonuc;
            }

            db.Tipdallari.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Girilen Tip Dalı Kayıdı Silindi";
            return sonuc;
        }

        #endregion

        #region kayitlar

        [HttpGet]
        [Route("api/doktorhastalarliste/{DoktorKimlik}")]

        public List<kayitlarModel> doktorhastalarliste(string DoktorKimlik)
        {

            List<kayitlarModel> liste = db.kayitlar.Where(s => s.kayitdoktorkimlik == DoktorKimlik).Select(x => new kayitlarModel()
            {
                
                kayitId=x.kayitId,
                kayitdoktorkimlik=x.kayitdoktorkimlik,
                kayithastakimlik=x.kayithastakimlik,

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.Doktorveriler = Doktorlarbykimlik1(kayit.kayitdoktorkimlik);
                kayit.Hastaveriler = HastaKayitbykimlik(kayit.kayithastakimlik);
            }

            return liste;
        }


        [HttpGet]
        [Route("api/hastadoktorlarliste/{HastaKimlik}")]

        public List<kayitlarModel> hastadoktorlarliste(string HastaKimlik)
        {

            List<kayitlarModel> liste = db.kayitlar.Where(s => s.kayithastakimlik == HastaKimlik).Select(x => new kayitlarModel()
            {

                kayitId = x.kayitId,
                kayitdoktorkimlik = x.kayitdoktorkimlik,
                kayithastakimlik = x.kayithastakimlik,

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.Doktorveriler = Doktorlarbykimlik1(kayit.kayitdoktorkimlik);
                kayit.Hastaveriler = HastaKayitbykimlik(kayit.kayithastakimlik);
            }

            return liste;
        }


        [HttpPost]
        [Route("api/kayitlarekle")]

        public SonucModel kayitlarekle(kayitlarModel model)
        {
            if (db.kayitlar.Count(s=>s.kayitdoktorkimlik == model.kayitdoktorkimlik &&
            s.kayithastakimlik == model.kayithastakimlik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "ilgili doktor bu hasta onceden kayitlidir";
                return sonuc;
            }

            kayitlar yeni = new kayitlar();
            yeni.kayitId = random.Next(900000000, 999999999).ToString();
            yeni.kayitdoktorkimlik = model.kayitdoktorkimlik;
            yeni.kayithastakimlik = model.kayithastakimlik;
            db.kayitlar.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "kayit eklendi";


            return sonuc;

        }


        [HttpDelete]
        [Route("api/kayitlarsil/{kayitId}")]

        public SonucModel kayitlarsil(string kayitId)
        {
            kayitlar kayit = db.kayitlar.Where(s => s.kayitId == kayitId).FirstOrDefault();
            if (kayit==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "kayit bulunamadi";
                return sonuc;
            }

            db.kayitlar.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "kayit silindi";

            return sonuc;

        }

        #endregion

    }
}
