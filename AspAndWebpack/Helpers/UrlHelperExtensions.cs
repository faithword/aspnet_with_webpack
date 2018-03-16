using System.Web;
using System.Web.Mvc;

namespace AspAndWebpack.Helpers
{
    public static class UrlHelperExtensions
    {
        /// <summary>
        /// Converts a virtual (relative) path into the packed equivalent.
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="contentPath"></param>
        /// <returns></returns>
        public static string PackedContent(this UrlHelper helper, string contentPath)
        {
            // Find where we are
            var targetPath = WebpackAssetHelper.Url(contentPath);
            if (targetPath.StartsWith("/"))
            {
                // Make it root-relative again so applications will work
                targetPath = "~" + targetPath;
            }

            return helper.Content(targetPath);
        }
    }
}