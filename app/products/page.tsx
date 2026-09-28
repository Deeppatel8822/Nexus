import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function ProductsPage() {
  return <><Header /><main className="page-shell"><div className="bc"><a href="/">Home</a> › <span>Products</span></div><section className="sec sec-white"><div className="sec-hdr"><div className="eyebrow">What we export</div><h1 className="sec-title">Our Products</h1></div><div className="ind-grid"><Link className="ind-card" href="/products/spices"><div className="ind-head sp"><div className="ind-name">Indian Spices</div></div></Link><Link className="ind-card" href="/products/paper-packaging"><div className="ind-head pk"><div className="ind-name">Paper Packaging</div></div></Link><Link className="ind-card" href="/products/chemicals"><div className="ind-head ch"><div className="ind-name">Chemical Products</div></div></Link></div></section></main><Footer /></>;
}