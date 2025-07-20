import Image from "next/image";

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
          All your favorite styles, united in one collection.
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative mb-6 sm:mb-0">
            <div className="bg-linear-to-b aspect-76/59 relative rounded-2xlto-transparent p-px dark:from-zinc-700">
              <Image
                src="/people.png"
                className="rounded-[15px]"
                alt="about"
                width={1207}
                height={929}
              />
            </div>
          </div>

          <div className="relative space-y-4">
            <p className="text-muted-foreground text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              <span className="text-accent-foreground font-bold text-justify">
                Veniam nemo corrupti impedit ut 
              </span>{" "}
              odio quam quas minus beatae ea officia suscipit tempore
            </p>
            <p className="text-muted-foreground text-justify">
              odit consectetur et mollitia assumenda, non cumque animi?
              Lorem ipsum dolor sit amet 
            </p>

            <div className="pt-6">
              <blockquote className="border-l-4 pl-4">
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Suscipit earum itaque provident accusamus maxime quasi 
                  culpa fugit, nihil tempore labore sed ex laborum dolorem 
                  nam vel minus, corrupti corporis nisi!  
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
