import React, { useEffect, useState } from "react";

/**
 * Harish — Data Engineer Portfolio (Enhanced)
 * Modern header, added Skills section and refined Achievements.
 * Theme: Black / Gold / White with blended hero.
 */

const SKILLS = [
  "Python (Pandas, PySpark, SQLAlchemy)",
  "Apache Spark, Kafka, Airflow, Glue, Step Functions",
  "Snowflake, Redshift, BigQuery, Delta Lake, Iceberg",
  "AWS (S3, Lambda, EMR, ECS, Kinesis)",
  "DataOps & CI/CD (Terraform, Docker, GitHub Actions)",
  "Governance & Security (Apache Ranger, KMS, IAM)",
];

const ACHIEVEMENTS = [
  "Led design of enterprise-scale Lakehouse with Iceberg and Delta Lake integrating multi-cloud analytics.",
  "Delivered 40% faster ETL via Spark optimization and event-driven orchestration.",
  "Enabled real-time insights with streaming data from Kinesis and Kafka.",
  "Implemented full data lineage and quality monitoring improving data trust company-wide.",
  "Optimized compute/storage cost by 25% via partition pruning and incremental SCD2 design.",
];

const CERTS = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    img: "https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/certification/approved/images/certification-badges/dea-badge-resized.d690717f5a67a228325f8468fba38518a0461d05.png",
    link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    name: "Snowflake SnowPro Core Certified",
    img: "https://logos.fullcertified.com/snowprodataengineer.png",
    link: "https://www.snowflake.com/en/certifications/snowpro-core/",
  },
  {
    name: "Databricks Certified Data Engineer Professional",
    img: "https://www.databricks.com/sites/default/files/2024-05/professional-badge-de.png?v=1717145841",
    link: "https://www.databricks.com/learn/certification/professional-data-engineer",
  },
];

export default function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repoError, setRepoError] = useState(null);

  // Fallback SVG data URI used when external images fail to load.
  const IMG_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23222222'/><text x='50%' y='50%' fill='%23ffffff' font-size='20' font-family='Arial,Helvetica,sans-serif' dominant-baseline='middle' text-anchor='middle'>Image unavailable</text></svg>";

  const handleImgError = (e) => {
    try {
      console.warn('Image failed to load, replacing with fallback:', e?.currentTarget?.src);
      e.currentTarget.onerror = null;
      e.currentTarget.src = IMG_FALLBACK;
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    setLoadingRepos(true);
    const url = "https://api.github.com/users/harishg4/repos?per_page=100&sort=updated";

    fetch(url)
      .then((r) => {
        // surface non-2xx responses with body if available
        if (!r.ok) {
          return r
            .json()
            .catch(() => ({ message: r.statusText }))
            .then((errBody) => {
              const message = `${r.status} ${r.statusText} - ${errBody && errBody.message ? errBody.message : JSON.stringify(errBody)}`;
              throw new Error(message);
            });
        }
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Unexpected response format from GitHub API");
        const filtered = data.filter((repo) => !repo.fork);
        setRepos(filtered.slice(0, 9));
        setRepoError(null);
      })
      .catch((err) => {
        console.error("Failed to load GitHub repos:", err);
        setRepos([]);
        setRepoError(err.message || "Unknown error fetching repositories");
      })
      .finally(() => setLoadingRepos(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-neutral-100">
      {/* Elegant Header */}
      <header className="sticky top-0 z-30 bg-black/70 backdrop-blur border-b border-yellow-400/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              HG
            </span>
            <span className="text-sm tracking-wide text-neutral-300">
              Data Engineering | Cloud | AI-driven Analytics
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#skills" className="hover:text-yellow-400">Skills</a>
            <a href="#achievements" className="hover:text-yellow-400">Achievements</a>
            <a href="#certifications" className="hover:text-yellow-400">Certifications</a>
            <a href="#projects" className="hover:text-yellow-400">Projects</a>
            <a href="#contact" className="hover:text-yellow-400">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative mx-auto max-w-6xl px-4 pt-20 pb-16">
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <img
            src="/images/harish-hero.jpg"
            alt="Harish background blend"
            className="object-cover w-full h-full blur-xl scale-110"
            style={{ objectPosition: '50% 50%' }}
            onError={handleImgError}
          />
        </div>
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
              Harish Gaddam
            </h1>
            <p className="mt-2 text-xl text-neutral-300">AWS | Snowflake | Databricks | Airflow | Spark</p>
            <p className="mt-4 max-w-xl text-neutral-300">
              Passionate about architecting high-performance, secure, and intelligent data platforms that power decision-making and AI at scale.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-yellow-500 px-5 py-2.5 text-black font-medium hover:bg-yellow-400 transition">View Projects</a>
              <a href="#contact" className="rounded-full border border-neutral-700 px-5 py-2.5 hover:bg-neutral-800 transition">Contact</a>
            </div>
          </div>
          <div className="flex justify-center">
              <img
                src="/images/harish-hero.jpg"
                alt="Harish portrait"
                className="h-64 w-64 md:h-80 md:w-80 rounded-full object-cover shadow-[0_0_50px_rgba(255,215,0,0.3)]"
                style={{ objectPosition: '55% 20%' }}
                loading="lazy"
                onError={handleImgError}
              />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Technical Skills</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-neutral-300">
          {SKILLS.map((s) => (
            <div key={s} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 hover:border-yellow-400/50 transition">
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Highlighted Achievements</h2>
        <ul className="space-y-3 text-neutral-300">
          {ACHIEVEMENTS.map((a) => (
            <li key={a} className="leading-relaxed before:content-['⚡'] before:mr-2 before:text-yellow-400">{a}</li>
          ))}
        </ul>
      </section>

      {/* Certifications */}
      <section id="certifications" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Certifications</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {CERTS.map((b) => (
            <a key={b.name} href={b.link} className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm hover:shadow-lg hover:border-yellow-400/40 transition text-center">
              <img src={b.img} alt={b.name} loading="lazy" className="w-40 h-auto mx-auto" onError={handleImgError} />
              <div className="mt-3 text-sm font-medium text-neutral-200">{b.name}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Publications</h2>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <div className="text-xl font-semibold text-yellow-300">Real-Time Data Pipeline Optimization for Autonomous Control Systems</div>
            <div className="text-sm text-neutral-400 mt-2 md:mt-0 md:ml-4">IEEE · May 9, 2025</div>
          </div>
          <div className="text-neutral-300 text-sm mb-2">Other authors</div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <a
              href="https://ieeexplore.ieee.org/document/11077491"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline text-sm font-medium"
            >View on IEEE Xplore</a>
            <button
              className="text-yellow-300 underline text-sm font-medium"
              style={{ textAlign: 'left' }}
              onClick={() => {
                const el = document.getElementById('pub-abstract');
                if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
              }}
            >Show abstract</button>
          </div>
          <div id="pub-abstract" style={{display:'none'}} className="text-neutral-200 text-sm whitespace-pre-line">
            Real-time data pipeline optimization plays a critical role in the efficiency and reliability of autonomous control systems, particularly in dynamic environments that demand low latency and high throughput. This paper explores the latest advancements in optimizing real-time data pipelines, focusing on the integration of sensor data, computational models, and decision-making algorithms used in autonomous systems. The discussion includes challenges related to data collection, preprocessing, and transmission, as well as techniques for enhancing the scalability, fault tolerance, and real-time capabilities of data pipelines. Furthermore, the paper reviews key optimization strategies, such as stream processing, distributed computing, and edge processing, and assesses their applicability to real-time decision-making in autonomous control systems. By analyzing recent research and practical applications, this paper aims to provide insights into the future development of efficient data pipelines that support the autonomous systems of tomorrow.
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">GitHub Projects</h2>
        {loadingRepos ? (
          <p className="text-neutral-400">Loading repositories...</p>
        ) : repoError ? (
          <div className="rounded-xl border border-red-600 bg-red-900/20 p-4">
            <div className="text-red-300 font-medium">Failed to load GitHub repositories</div>
            <pre className="mt-2 text-sm text-red-200 whitespace-pre-wrap">{repoError}</pre>
            <div className="mt-2 text-sm text-neutral-400">If this persists, check network, CORS, or rate-limiting (GitHub API rate limit for unauthenticated requests is low).</div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r) => (
              <a key={r.id} href={r.html_url} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 hover:border-yellow-400/40 transition">
                <div className="text-lg font-semibold text-yellow-400">{r.name}</div>
                <p className="mt-2 text-sm text-neutral-300">{r.description || "No description available."}</p>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Let's Connect</h2>
        <ul className="space-y-2 text-neutral-300">
          <li>Email: <a href="mailto:hnaidugaddam@gmail.com" className="text-yellow-400 hover:underline">hnaidugaddam@gmail.com</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/harishg4" className="text-yellow-400 hover:underline">linkedin.com/in/harishg4</a></li>
          <li>GitHub: <a href="https://github.com/harishg4" className="text-yellow-400 hover:underline">github.com/harishg4</a></li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 bg-black py-6 text-neutral-300 text-center text-sm">
        © {new Date().getFullYear()} Harish Gaddam • Data Engineering | Cloud | AI-driven Analytics
      </footer>
    </div>
  );
}
