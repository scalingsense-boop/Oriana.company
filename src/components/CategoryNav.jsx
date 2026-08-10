import { categoryNavItems } from '../data/categoryNav.js';

export default function CategoryNav({ onSelectTab }) {
  return (
    <section className="category-nav-section">
      <div className="category-scroll">
        {categoryNavItems.map((item, i) => (
          <a
            href="#services"
            className="category-circle"
            key={i}
            onClick={() => onSelectTab(item.tab)}
          >
            <div
              className="category-thumb"
              style={item.img ? { backgroundImage: `url('${item.img}')` } : { background: 'var(--grad-vivid)' }}
            >
              {!item.img && item.icon}
            </div>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
