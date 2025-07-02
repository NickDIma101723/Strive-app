export const globalStyles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-down {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes expand {
    from { width: 0; }
    to { width: 4rem; }
  }
  
  @keyframes profile-appear {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  
  .animate-slide-down {
    animation: slide-down 0.6s ease-out;
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out;
  }
  
  .animate-expand {
    animation: expand 1s ease-out 0.5s both;
  }
  
  .animate-profile-appear {
    animation: profile-appear 0.5s ease-out both;
  }
  
  .animate-stagger-in {
    animation: fade-in 0.8s ease-out 0.3s both;
  }

  /* Hover Effects */
  .hover-slide-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    transform: translateX(-100%);
    transition: transform 2s ease;
    z-index: 1;
  }

  .hover-slide-effect:hover::before {
    transform: translateX(0);
  }

  .hover-slide-effect:hover span {
    color: black;
    transition: color 0.3s ease 0.5s;
  }

  .hover-slide-effect-outline::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    transform: translateX(-100%);
    transition: transform 2s ease;
    z-index: 1;
  }

  .hover-slide-effect-outline:hover::before {
    transform: translateX(0);
  }

  .hover-slide-effect-outline:hover span {
    color: black;
    transition: color 0.3s ease 0.5s;
  }

  .card-hover-effect:hover .card-slide-bg {
    transform: translateX(0);
  }
  
  .card-hover-effect:hover .card-text-hover {
    color: black;
    transition: color 0.3s ease 0.1s;
  }

  .tab-hover-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    transform: translateX(-100%);
    transition: transform 1s ease;
    z-index: 0;
  }
  
  .tab-hover-effect:hover::before {
    transform: translateX(0);
  }
  
  .tab-hover-effect:hover {
    color: black !important;
  }

  .nav-hover-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    transform: translateX(-100%);
    transition: transform 1s ease;
    z-index: 0;
  }
  
  .nav-hover-effect:hover::before {
    transform: translateX(0);
  }
  
  .nav-hover-effect:hover {
    color: black !important;
  }

  .hover-underline-effect {
    position: relative;
  }
  
  .hover-underline-effect::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: white;
    transition: width 1s ease;
  }
  
  .hover-underline-effect:hover::after {
    width: 100%;
  }
`
