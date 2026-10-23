import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { buildMetadata } from "../_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title: "Services" });
}

export default async function ServicesPage() {
  const services = await sanityFetch({ query: SERVICES_QUERY, tags: ["service"] });

  return (
    <section className="section">
      <div className="container">
        <h1>Services</h1>
        {services.length ? (
          <ul className="card-grid">
            {services.map((service) => (
              <li key={service._id} className="card">
                <h2 className="card-title">
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                </h2>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="lead">Services will be listed here soon.</p>
        )}
      </div>
    </section>
  );
}
