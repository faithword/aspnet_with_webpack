using System.Collections.Generic;
using System.Configuration;
using System.Web;

using Newtonsoft.Json.Linq;

namespace AspAndWebpack.Helpers
{
    /// <summary>
    /// Parses a manifest file produced by webpack-manifest-plugin
    /// </summary>
    public static class WebpackAssetHelper
    {
        private static readonly Dictionary<string, string> assets;
        private static string path;
        private static string file;

        static WebpackAssetHelper()
        {
            Prefix = "~/src/";
            Path = ConfigurationManager.AppSettings["AssetPath"] ?? "dist";
            File = "build-manifest.json";
            assets = new Dictionary<string, string>();
        }

        /// <summary>
        /// Gets the standard prefix to strip (default ~/src/)
        /// </summary>
        public static string Prefix { get; set; }

        /// <summary>
        /// Gets the path for the asset manifest (default: ~/dist)
        /// </summary>
        public static string Path
        {
            get => path;
            set
            {
                path = value;
                MissingFile = false;
            }
        }

        /// <summary>
        /// Gets the file for the asset manifest (default: build-manifest.json)
        /// </summary>
        public static string File
        {
            get => file;
            set
            {
                file = value;
                MissingFile = false;
            }
        }

        public static bool MissingFile { get; private set; }

        /// <summary>
        /// Try to find the content path in the assets
        /// </summary>
        /// <param name="rootPath">Root path for the web</param>
        /// <param name="contentPath">Content path we want to resolve</param>
        /// <returns></returns>
        public static string Url(string contentPath, string rootPath = null)
        {
            if (assets.Count == 0 && !MissingFile)
            {
                Initialize(rootPath ?? HttpRuntime.AppDomainAppPath);
            }

            if (contentPath.StartsWith(Prefix))
            {
                // Strip off the prefix to start with
                contentPath = contentPath.Substring(Prefix.Length);
            }

            if (assets.TryGetValue(contentPath, out string targetPath))
            {
                return targetPath;
            }

            return contentPath;
        }

        private static void Initialize(string rootPath)
        {
            assets.Clear();

            var fileName = System.IO.Path.Combine(rootPath, Path, File);
            if (!System.IO.File.Exists(fileName))
            {
                MissingFile = true;
            }

            var jo = JObject.Parse(System.IO.File.ReadAllText(fileName));
            foreach (var item in jo)
            {
                assets[item.Key] = item.Value.ToString();
            }
        }
    }
}