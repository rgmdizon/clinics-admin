import React from "react"

const Description = ({ image, title, subtitle }) => (
  <div>
    <div className="is-hidden-mobile">
      <div className="has-text-centered">
        <img src={image.src} alt={image.alt} width={image.width} />
      </div>
      <h3>{title}</h3>
      <h5 className="mt-1 subtitle">{subtitle}</h5>
    </div>
    <div className="is-hidden-desktop is-hidden-tablet">
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src={image.src} alt={image.alt} width={image.width} />
          </p>
        </figure>
        <div class="media-content">
          <h3 className="mt-1">{title}</h3>
        </div>
      </article>
      <h5 className="mt-1 subtitle">{subtitle}</h5>
    </div>
  </div>
)

export default Description
