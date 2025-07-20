import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/app/components/header';
import Footer from '@/app/components/footer';
import { Button } from '@/app/components/ui/button';

export default function Hero() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:flex-row lg:items-center lg:gap-12">
              <div className="mx-auto max-w-lg text-center lg:mx-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-0 xl:text-7xl">
                  Ship 10x Faster with Us
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quisquam aperiam totam nemo quidem vero.
                </p>
                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
                    <Link href="#link">
                      <span className="text-nowrap">Order Now</span>
                    </Link>
                  </Button>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="px-5 text-base"
                  >
                    <Link href="#link">
                      <span className="text-nowrap">View Collection</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2">
                <div className="relative">
                  <Image
                    src="/shoes.png"
                    alt="Shoes"
                    width={600}
                    height={600}
                    className="mx-auto lg:ml-20 lg:mr-20 w-full max-w-md lg:max-w-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}