using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace hastaportali.Auth
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" }); // Farklı domainlerden istek sorunu yaşamamak için

            //Burada kendi authentication yöntemimizi belirleyebiliriz.Veritabanı bağlantısı vs...
            var doktorServis = new DoktorService();
            var Doktorlar = doktorServis.doktorOturumacma(context.UserName, context.Password);
            List<string> doktoryetkileri = new List<string>();

            if (Doktorlar != null)
            {
                string yetki = "";
                if (Doktorlar.DoktorAdmin == 1)
                {
                    yetki = "Admin";

                }
                else
                {
                    yetki = "Uye";
                }
                doktoryetkileri.Add(yetki);

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, yetki));
                identity.AddClaim(new Claim(ClaimTypes.PrimarySid, Doktorlar.DoktorKimlik.ToString()));

                AuthenticationProperties propert = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { "DoktorKimlik", Doktorlar.DoktorKimlik.ToString() },
                    { "DoktorAdSoyad", Doktorlar.DoktorAdSoyad },
                    { "doktoryetkileri",Newtonsoft.Json.JsonConvert.SerializeObject(doktoryetkileri) }

               });
                AuthenticationTicket ticket = new AuthenticationTicket(identity, propert);


                context.Validated(ticket);
            }
            else
            {
                context.SetError("Geçersiz istek", "  kimlik ya da sifre bilgisi Hatalı");
            }



        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}
