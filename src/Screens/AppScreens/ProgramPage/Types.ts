
export type HtmlData = {
    id: number; meta_title: string; meta_keywords: string; meta_description: string; coursetitle: string; slug: string; courseheading: string; coursesummary: string; coursecontent: string; coursehighlights: string; image: string; imagealt: string; courselength: string; coursetype: string; courselevel: string; video: string; tabs: { "Modules Covered": string; Reviews: Array<{ point: string; }>; }; coursefees: {
      fees: string; offerfees: string; 
      currency_symbol: string; currency: string;
    };
  } | undefined

