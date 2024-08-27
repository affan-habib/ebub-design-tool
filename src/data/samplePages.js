import sample1 from './images/sample1.png'
import sample2 from './images/sample2.png'
export const samplePages = [
  {
    magazine: sample1,
    html: `        
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; height: 100%; display: flex; align-items: center; justify-content: center;">
    <div style="background-color: #ffffff; padding: 30px; box-sizing: border-box; border-radius: 10px; max-width: 210mm; max-height: 297mm; overflow: auto;">
        <header style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 15px; color: #2c3e50;">Main Heading of the Magazine</h1>
            <h2 style="font-size: 24px; color: #e74c3c; margin-bottom: 20px;">Subheading Goes Here</h2>
            <hr style="width: 100px; height: 4px; background-color: #3498db; margin: 0 auto 25px auto; border: none;">
        </header>

        <section style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div style="padding: 25px; background-color: #ecf0f1; border-radius: 10px;">
                <p style="margin-bottom: 20px; font-size: 18px; color: #34495e;">
                    Welcome to this feature-rich magazine page. The left section provides an introduction to the main topic, offering insights and engaging content.
                </p>
                <img src="https://picsum.photos/500/350" alt="Random Image from Picsum" style="width: 100%; height: 250px; object-fit: cover; margin-bottom: 20px; border-radius: 10px;">
                <p style="margin-bottom: 20px; font-size: 18px; color: #34495e;">
                    Dive deeper into the content with this additional text that provides more context and details. This section enhances the visual appeal of the article.
                </p>
            </div>

            <div style="padding: 25px; background-color: #ecf0f1; border-radius: 10px;">
                <p style="margin-bottom: 20px; font-size: 18px; color: #34495e;">
                    The right column complements the main content with supporting information and insights. It serves to balance the layout and provide a broader perspective on the topic.
                </p>
                <p style="margin-bottom: 20px; font-size: 18px; color: #34495e;">
                    Here’s some more text that offers additional details and context, enriching the overall content and making the page more engaging for readers.
                </p>
                <p style="margin-bottom: 20px; font-size: 18px; color: #34495e;">
                    Here’s some more text that offers additional details and context, enriching the overall content and making the page more engaging for readers.
                </p>
                <p style="margin-bottom: 20px; font-size: 18px; color: #34495e;">
                    Here’s some more text that offers additional details and context, enriching the overall content and making the page more engaging for readers.
                </p>
                <p style="margin-bottom: 20px; font-size: 18px; color: #34495e;">
                    Here’s some more text that offers additional details and context, enriching the overall content and making the page more engaging for readers.
                </p>
            </div>
        </section>
    </div>
</body>`},
  {
    magazine: sample2,
    html: `        
  <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f9f9f9;">
    <div style="background-color: #ffffff; padding: 30px; box-sizing: border-box; border-radius: 10px; max-width: 210mm; max-height: 297mm; height: 100%; overflow: auto;">
        <section style="text-align: center; margin-bottom: 30px;">
            <img src="https://picsum.photos/800/400" alt="Cover Image" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="font-size: 36px; font-weight: bold; color: #2c3e50; margin-bottom: 10px;">Magazine Title</h1>
            <h2 style="font-size: 24px; color: #e74c3c;">Subtitle or Tagline</h2>
        </section>

        <section style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
            <div style="padding: 20px; background-color: #ecf0f1; border-radius: 10px;">
                <h3 style="font-size: 22px; color: #2c3e50; margin-bottom: 15px;">Introduction</h3>
                <p style="margin-bottom: 15px; font-size: 16px; color: #34495e;">
                    This section provides an engaging introduction to the magazine or book. It should give readers a glimpse of what to expect and entice them to read more.
                </p>
                <img src="https://picsum.photos/400/250" alt="Sample Image" style="width: 100%; height: auto; border-radius: 8px;">
                <p style="margin-bottom: 15px; font-size: 16px; color: #34495e;">
                    Additional details and introductory content go here. This part can highlight key topics or themes covered in the publication.
                </p>
            </div>

            <div style="padding: 20px; background-color: #ecf0f1; border-radius: 10px;">
                <h3 style="font-size: 22px; color: #2c3e50; margin-bottom: 15px;">Featured Articles</h3>
                <p style="margin-bottom: 15px; font-size: 16px; color: #34495e;">
                    This column showcases featured articles or highlights from the magazine or book. It provides an overview of important sections and topics.
                </p>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    <li style="margin-bottom: 10px; font-size: 16px; color: #34495e;">Article 1: Brief description of the content.</li>
                    <li style="margin-bottom: 10px; font-size: 16px; color: #34495e;">Article 2: Key points and highlights.</li>
                    <li style="margin-bottom: 10px; font-size: 16px; color: #34495e;">Article 3: Summary and takeaways.</li>
                </ul>
            </div>
        </section>
    </div>
</body>
`
  }


];

export const getRandomHtmlDesign = () => {
  const randomIndex = Math.floor(Math.random() * samplePages.length);
  return samplePages[randomIndex];
};

export const getAllHtmlDesigns = () => {
  return samplePages;
};