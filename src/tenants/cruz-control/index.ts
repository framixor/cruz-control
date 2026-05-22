import type { Tenant } from "../types";
import heroImg from "../../assets/hero.png";

const placeholderBefore = {
  src: heroImg,
  alt: "Placeholder image representing the project before treatment.",
};

const placeholderAfter = {
  src: heroImg,
  alt: "Placeholder image representing the project after treatment.",
};

export const cruzControlTenant: Tenant = {
  id: "cruz-control",
  beforeAfterItems: [
    {
      title: "Driveway Resurfacing",
      description:
        "Aged concrete driveway with surface cracks, replaced with a uniform sealed finish.",
      category: "exterior",
      beforeImage: placeholderBefore,
      afterImage: placeholderAfter,
    },
    {
      title: "Garage Floor Refinish",
      description:
        "Stained garage floor refinished with a textured epoxy coating for durability.",
      category: "interior",
      beforeImage: placeholderBefore,
      afterImage: placeholderAfter,
    },
    {
      title: "Front Walkway Repair",
      description:
        "Settled walkway leveled and overlaid with a slip-resistant top layer.",
      category: "exterior",
      beforeImage: placeholderBefore,
      afterImage: placeholderAfter,
    },
  ],
};
