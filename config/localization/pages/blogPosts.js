export const BLOG_POSTS = [
  {
    slug: 'como-la-presion-de-los-neumaticos-impacta-el-consumo',
    date: '2026-03-20',
    coverImage: '/blog/scania-trucks-on-highway.jpg',
    categories: ['Ahorro de combustible', 'TPMS'],
    es: {
      title: '¿Cómo la presión de los neumáticos impacta el consumo de combustible?',
      excerpt: 'Un experimento real con camiones MAN demostró que reducir solo 2 bar en 4 neumáticos eleva el consumo un 8,5%. Para una flota de 100 vehículos, eso equivale a más de 297.500 litros de combustible extra al año.',
      content: `
<p class="lead">La relación entre la presión de los neumáticos y el consumo de combustible se conoce desde hace décadas. Sin embargo, muchos gestores de flota subestiman su impacto real. En PressurePro pusimos a prueba esta hipótesis con un experimento controlado que arroja números concretos — y sorprendentes.</p>

<h2>El problema invisible</h2>
<p>Visualmente, un neumático de camión inflado a 8 bar es prácticamente indistinguible de uno inflado a 6 bar. Esa diferencia de 2 bar — que ningún conductor detectaría a simple vista — fue exactamente la que pusimos a prueba.</p>
<p>Los conductores con frecuencia no saben qué presión tienen sus neumáticos. Las inspecciones manuales son intermitentes y poco confiables. El resultado: se estima que hasta el <strong>50% de los equipos en operación circulan con neumáticos desinflados</strong> sin que nadie lo sepa.</p>

<h2>El experimento: condiciones reales, resultados reales</h2>
<p>Para medir el impacto de manera rigurosa, se realizó una prueba nocturna en un anillo vial de la ciudad, en colaboración con una empresa de distribución de alimentos. Las condiciones nocturnas permitieron evitar el tráfico y mantener velocidades constantes.</p>

<h3>Metodología</h3>
<ul>
  <li>Dos camiones MAN TGS 4x2 con semirremolques de tres ejes idénticos</li>
  <li>Neumáticos con 10% de desgaste en el eje de dirección y ~50% en los demás</li>
  <li>Presión inicial igualada a <strong>8 bar en frío</strong> en todos los neumáticos</li>
  <li>Ambos vehículos equipados con rastreadores GPS GalileoSKY y sensores TPMS de PressurePro</li>
  <li>Combustible medido con balanzas electrónicas de precisión de 5 gramos</li>
</ul>

<h2>Primera vuelta: línea de base</h2>
<p>Ambos camiones completaron 142 km a una velocidad media de 77 km/h con los 12 neumáticos a 8 bar.</p>

<div class="data-box">
  <div class="data-item">
    <span class="data-label">Camión A</span>
    <span class="data-value">27,81 l/100 km</span>
  </div>
  <div class="data-item">
    <span class="data-label">Camión B</span>
    <span class="data-value">29,27 l/100 km</span>
  </div>
</div>

<p>La diferencia inicial entre ambos vehículos era esperable: no existen dos camiones con exactamente el mismo consumo, especialmente con 4 años de uso. Lo importante era medir el <em>cambio</em> relativo en cada uno después de modificar la presión.</p>

<h2>Segunda vuelta: bajamos 2 bar en solo 4 ruedas</h2>
<p>Para simular una situación real de operación, se decidió intervenir de forma mínima: <strong>solo 4 de los 12 neumáticos</strong> del eje motriz del Camión A fueron bajados a 6 bar. Los 8 restantes se mantuvieron a 8 bar. El Camión B no se modificó.</p>
<p>Esos 4 neumáticos desinflados eran visualmente indistinguibles de los demás. Ningún conductor los detectaría sin instrumentos.</p>

<h2>Los resultados</h2>
<p>El recorrido y la velocidad media fueron idénticos a la primera vuelta. Los resultados fueron contundentes:</p>

<div class="data-box">
  <div class="data-item highlight">
    <span class="data-label">Camión A (4 ruedas a 6 bar)</span>
    <span class="data-value">30,18 l/100 km</span>
    <span class="data-delta">+8,5%</span>
  </div>
  <div class="data-item">
    <span class="data-label">Camión B (sin cambios)</span>
    <span class="data-value">29,70 l/100 km</span>
    <span class="data-delta">+1,5% (variación normal)</span>
  </div>
</div>

<p>El Camión A — que había sido el más eficiente en la primera etapa — pasó a ser el menos eficiente en la segunda, con un <strong>aumento de consumo del 8,5%</strong> atribuible exclusivamente a la presión reducida en solo 4 neumáticos.</p>

<h2>¿Qué significa el 8,5% en dinero real?</h2>
<p>A primera vista, 7-8% puede parecer un número pequeño. Pero hagamos la matemática para una flota típica:</p>

<div class="calc-box">
  <ul>
    <li>Flota de <strong>100 vehículos</strong></li>
    <li>100.000 km por camión al año (distancia conservadora)</li>
    <li>Consumo promedio: <strong>35 l/100 km</strong> (cargados y en rutas reales)</li>
    <li>Cada camión consume ~35.000 litros/año</li>
    <li>Con un 8,5% de ineficiencia: <strong>2.975 litros extra por camión</strong></li>
    <li>Multiplicado por 100 vehículos: <strong>297.500 litros adicionales al año</strong></li>
  </ul>
  <p>Y eso sin contar el desgaste prematuro de los neumáticos, los costos de mantenimiento adicionales ni el impacto en la seguridad.</p>
</div>

<h2>Más allá del combustible: desgaste y seguridad</h2>
<p>El consumo de combustible es el impacto más cuantificable, pero no el único:</p>
<ul>
  <li><strong>Desgaste prematuro:</strong> la subinflación puede causar hasta un 70% más de desgaste irregular, reduciendo significativamente la vida útil del neumático.</li>
  <li><strong>Sobrecalentamiento:</strong> los neumáticos desinflados generan más calor por fricción, aumentando el riesgo de reventones.</li>
  <li><strong>Estabilidad reducida:</strong> la superficie de contacto con el suelo cambia, afectando el frenado y el control del vehículo — especialmente crítico en curvas y condiciones de lluvia.</li>
  <li><strong>Emisiones:</strong> mayor consumo de combustible implica directamente más emisiones de CO₂, lo que afecta el cumplimiento de objetivos de sostenibilidad corporativa.</li>
</ul>

<h2>La solución: monitoreo continuo con TPMS</h2>
<p>El mayor problema no es que los neumáticos pierden presión — eso es inevitable. El problema es <strong>no saber cuándo sucede</strong>.</p>
<p>Un sistema TPMS (Tire Pressure Monitoring System) como PressurePro resuelve exactamente esto: monitoreo continuo y en tiempo real de la presión y temperatura de cada neumático, con alertas automáticas al conductor y al gestor de flota antes de que el problema impacte la operación.</p>

<h3>Beneficios comprobados en flotas reales</h3>
<ul>
  <li>Reducción del consumo de combustible entre 3% y 8% según el estado inicial de la flota</li>
  <li>Extensión de la vida útil de los neumáticos en hasta un 25%</li>
  <li>Reducción de paradas no planificadas por fallas de neumáticos</li>
  <li>Retorno sobre la inversión (ROI) documentado en menos de 12 meses en flotas medianas</li>
</ul>

<h2>Conclusión</h2>
<p>Los datos del experimento son claros: <strong>2 bar de diferencia en solo 4 neumáticos equivalen a un 8,5% más de combustible</strong>. En una flota comercial, eso se traduce en cientos de miles de litros — y de dólares — desperdiciados cada año.</p>
<p>Controlar la presión dejó de ser un tema de mantenimiento preventivo básico. Es una decisión estratégica con impacto directo en la rentabilidad de la operación.</p>
<p><strong>¿Sabés con certeza qué presión tienen los neumáticos de tu flota ahora mismo?</strong></p>
      `,
      seoTitle: 'Presión de neumáticos y consumo de combustible: experimento real | PressurePro Blog',
      seoDescription: 'Un experimento con camiones MAN demostró que 2 bar menos en 4 neumáticos aumenta el consumo un 8,5%. Para 100 camiones, son casi 300.000 litros extra al año.',
      seoKeywords: 'presion neumaticos consumo combustible, ahorro combustible flota, TPMS flotas, monitoreo neumaticos, PressurePro',
    },
    en: {
      title: 'How Tire Pressure Impacts Fuel Consumption',
      excerpt: 'A real-world experiment with MAN trucks showed that reducing pressure by just 2 bar in 4 tires increased fuel consumption by 8.5%. For a fleet of 100 vehicles, that means over 297,000 extra liters per year.',
      content: `
<p class="lead">The relationship between tire pressure and fuel consumption has been known for decades. Yet many fleet managers underestimate its real-world impact. We put this to the test with a controlled experiment that delivers concrete — and surprising — numbers.</p>

<h2>The Invisible Problem</h2>
<p>Visually, a truck tire at 8 bar looks almost identical to one at 6 bar. That 2 bar difference — which no driver would detect by sight — is exactly what we tested.</p>
<p>Drivers often don't know the pressure in their tires. Manual inspections are intermittent and unreliable. The result: it is estimated that up to <strong>50% of vehicles in operation run on underinflated tires</strong> without anyone knowing.</p>

<h2>The Experiment: Real Conditions, Real Results</h2>
<p>To measure the impact rigorously, a nighttime test was carried out on a city ring road, in collaboration with a food distribution company. Night conditions allowed for consistent speeds and no traffic interference.</p>

<h3>Methodology</h3>
<ul>
  <li>Two MAN TGS 4x2 trucks with identical three-axle semi-trailers</li>
  <li>Tires with 10% tread wear on the steering axle and ~50% on other wheels</li>
  <li>Initial pressure equalized to <strong>8 bar cold</strong> on all tires</li>
  <li>Both vehicles equipped with GalileoSKY GPS trackers and PressurePro TPMS sensors</li>
  <li>Fuel measured using precision electronic scales accurate to 5 grams</li>
</ul>

<h2>First Lap: Establishing a Baseline</h2>
<p>Both trucks completed 142 km at an average speed of 77 km/h with all 12 tires at 8 bar.</p>

<div class="data-box">
  <div class="data-item">
    <span class="data-label">Truck A</span>
    <span class="data-value">27.81 l/100 km</span>
  </div>
  <div class="data-item">
    <span class="data-label">Truck B</span>
    <span class="data-value">29.27 l/100 km</span>
  </div>
</div>

<p>The initial difference between both vehicles was expected — no two trucks have exactly the same fuel consumption, especially after 4 years of use. What mattered was measuring the <em>relative change</em> after adjusting pressure.</p>

<h2>Second Lap: Dropping 2 Bar in Just 4 Tires</h2>
<p>To simulate a real operating scenario, only <strong>4 of the 12 tires</strong> on Truck A's drive axle were deflated to 6 bar. The remaining 8 stayed at 8 bar. Truck B was left unchanged.</p>
<p>Those 4 tires were visually indistinguishable from the rest. No driver would notice without instruments.</p>

<h2>The Results</h2>
<p>Distance and average speed were identical to the first lap. The results were unambiguous:</p>

<div class="data-box">
  <div class="data-item highlight">
    <span class="data-label">Truck A (4 tires at 6 bar)</span>
    <span class="data-value">30.18 l/100 km</span>
    <span class="data-delta">+8.5%</span>
  </div>
  <div class="data-item">
    <span class="data-label">Truck B (unchanged)</span>
    <span class="data-value">29.70 l/100 km</span>
    <span class="data-delta">+1.5% (normal variation)</span>
  </div>
</div>

<p>Truck A — the most efficient in the first stage — became the least efficient in the second, with an <strong>8.5% increase in fuel consumption</strong> attributable solely to pressure reduction in just 4 tires.</p>

<h2>What Does 8.5% Mean in Real Money?</h2>
<p>At first glance, 7–8% might seem like a small number. But let's do the math for a typical fleet:</p>

<div class="calc-box">
  <ul>
    <li>Fleet of <strong>100 vehicles</strong></li>
    <li>100,000 km per truck per year (conservative estimate)</li>
    <li>Average consumption: <strong>35 l/100 km</strong> (loaded, real-world routes)</li>
    <li>Each truck consumes ~35,000 liters/year</li>
    <li>With 8.5% inefficiency: <strong>2,975 extra liters per truck</strong></li>
    <li>Multiplied across 100 vehicles: <strong>297,500 additional liters per year</strong></li>
  </ul>
  <p>And that excludes premature tire wear, additional maintenance costs, and safety impact.</p>
</div>

<h2>Beyond Fuel: Wear and Safety</h2>
<p>Fuel consumption is the most quantifiable impact, but not the only one:</p>
<ul>
  <li><strong>Premature wear:</strong> underinflation can cause up to 70% more irregular wear, significantly reducing tire lifespan.</li>
  <li><strong>Overheating:</strong> underinflated tires generate more heat from friction, increasing blowout risk.</li>
  <li><strong>Reduced stability:</strong> the contact patch changes, affecting braking and vehicle control — especially critical in turns and wet conditions.</li>
  <li><strong>Emissions:</strong> higher fuel consumption means more CO₂ emissions, directly affecting corporate sustainability targets.</li>
</ul>

<h2>The Solution: Continuous TPMS Monitoring</h2>
<p>The biggest problem isn't that tires lose pressure — that's inevitable. The problem is <strong>not knowing when it happens</strong>.</p>
<p>A TPMS system like PressurePro solves exactly this: continuous real-time monitoring of each tire's pressure and temperature, with automatic alerts to the driver and fleet manager before the problem affects operations.</p>

<h3>Proven Benefits in Real Fleets</h3>
<ul>
  <li>Fuel consumption reduction between 3% and 8% depending on the fleet's initial condition</li>
  <li>Tire lifespan extended by up to 25%</li>
  <li>Reduced unplanned stoppages due to tire failures</li>
  <li>Documented ROI in under 12 months for mid-size fleets</li>
</ul>

<h2>Conclusion</h2>
<p>The experimental data is clear: <strong>2 bar less in just 4 tires equals 8.5% more fuel</strong>. For a commercial fleet, that translates into hundreds of thousands of liters — and dollars — wasted every year.</p>
<p>Managing tire pressure is no longer just basic preventive maintenance. It's a strategic decision with direct impact on operational profitability.</p>
<p><strong>Do you know for certain what pressure your fleet's tires are at right now?</strong></p>
      `,
      seoTitle: 'Tire Pressure & Fuel Consumption: Real Experiment | PressurePro Blog',
      seoDescription: 'An experiment with MAN trucks proved that 2 bar less in 4 tires raises fuel use by 8.5%. For 100 trucks, that is nearly 300,000 extra liters per year.',
      seoKeywords: 'tire pressure fuel consumption, fleet fuel savings, TPMS fleets, tire monitoring, PressurePro',
    },
    pt: {
      title: 'Como a pressão dos pneus impacta o consumo de combustível',
      excerpt: 'Um experimento real com caminhões MAN mostrou que reduzir apenas 2 bar em 4 pneus aumenta o consumo em 8,5%. Para uma frota de 100 veículos, isso equivale a mais de 297.000 litros extras por ano.',
      content: `
<p class="lead">A relação entre a pressão dos pneus e o consumo de combustível é conhecida há décadas. No entanto, muitos gestores de frota subestimam seu impacto real. Testamos essa hipótese com um experimento controlado que fornece números concretos — e surpreendentes.</p>

<h2>O Problema Invisível</h2>
<p>Visualmente, um pneu de caminhão a 8 bar é praticamente indistinguível de um a 6 bar. Essa diferença de 2 bar — que nenhum motorista detectaria a olho nu — foi exatamente o que testamos.</p>
<p>Os motoristas frequentemente não sabem qual é a pressão dos seus pneus. As inspeções manuais são intermitentes e pouco confiáveis. O resultado: estima-se que até <strong>50% dos veículos em operação circulam com pneus murchos</strong> sem que ninguém saiba.</p>

<h2>O Experimento: Condições Reais, Resultados Reais</h2>
<p>Para medir o impacto de forma rigorosa, foi realizado um teste noturno em um anel viário urbano, em colaboração com uma empresa de distribuição de alimentos. As condições noturnas permitiram velocidades constantes e sem interferência do tráfego.</p>

<h3>Metodologia</h3>
<ul>
  <li>Dois caminhões MAN TGS 4x2 com semirreboques de três eixos idênticos</li>
  <li>Pneus com 10% de desgaste da banda de rodagem no eixo de direção e ~50% nos demais</li>
  <li>Pressão inicial igualada a <strong>8 bar a frio</strong> em todos os pneus</li>
  <li>Ambos os veículos equipados com rastreadores GPS GalileoSKY e sensores TPMS da PressurePro</li>
  <li>Combustível medido com balanças eletrônicas de precisão de 5 gramas</li>
</ul>

<h2>Primeira Volta: Estabelecendo a Linha de Base</h2>
<p>Ambos os caminhões completaram 142 km a uma velocidade média de 77 km/h com todos os 12 pneus a 8 bar.</p>

<div class="data-box">
  <div class="data-item">
    <span class="data-label">Caminhão A</span>
    <span class="data-value">27,81 l/100 km</span>
  </div>
  <div class="data-item">
    <span class="data-label">Caminhão B</span>
    <span class="data-value">29,27 l/100 km</span>
  </div>
</div>

<p>A diferença inicial entre os dois veículos era esperada — dois caminhões nunca têm exatamente o mesmo consumo, especialmente após 4 anos de uso. O importante era medir a <em>variação relativa</em> em cada um após ajustar a pressão.</p>

<h2>Segunda Volta: Reduzindo 2 Bar em Apenas 4 Pneus</h2>
<p>Para simular um cenário real de operação, apenas <strong>4 dos 12 pneus</strong> do eixo motriz do Caminhão A foram desinflados para 6 bar. Os outros 8 foram mantidos a 8 bar. O Caminhão B não foi alterado.</p>
<p>Esses 4 pneus eram visualmente indistinguíveis dos demais. Nenhum motorista os notaria sem instrumentos.</p>

<h2>Os Resultados</h2>
<p>A distância e a velocidade média foram idênticas à primeira volta. Os resultados foram contundentes:</p>

<div class="data-box">
  <div class="data-item highlight">
    <span class="data-label">Caminhão A (4 pneus a 6 bar)</span>
    <span class="data-value">30,18 l/100 km</span>
    <span class="data-delta">+8,5%</span>
  </div>
  <div class="data-item">
    <span class="data-label">Caminhão B (sem alterações)</span>
    <span class="data-value">29,70 l/100 km</span>
    <span class="data-delta">+1,5% (variação normal)</span>
  </div>
</div>

<p>O Caminhão A — o mais eficiente na primeira etapa — tornou-se o menos eficiente na segunda, com um <strong>aumento de consumo de 8,5%</strong> atribuível exclusivamente à redução de pressão em apenas 4 pneus.</p>

<h2>O Que 8,5% Representa em Dinheiro Real?</h2>
<p>À primeira vista, 7–8% pode parecer um número pequeno. Mas vamos fazer os cálculos para uma frota típica:</p>

<div class="calc-box">
  <ul>
    <li>Frota de <strong>100 veículos</strong></li>
    <li>100.000 km por caminhão por ano (estimativa conservadora)</li>
    <li>Consumo médio: <strong>35 l/100 km</strong> (carregados, rotas reais)</li>
    <li>Cada caminhão consome ~35.000 litros/ano</li>
    <li>Com 8,5% de ineficiência: <strong>2.975 litros extras por caminhão</strong></li>
    <li>Multiplicado por 100 veículos: <strong>297.500 litros adicionais por ano</strong></li>
  </ul>
  <p>E isso sem considerar o desgaste prematuro dos pneus, os custos adicionais de manutenção nem o impacto na segurança.</p>
</div>

<h2>Além do Combustível: Desgaste e Segurança</h2>
<p>O consumo de combustível é o impacto mais quantificável, mas não é o único:</p>
<ul>
  <li><strong>Desgaste prematuro:</strong> a subinflação pode causar até 70% mais desgaste irregular, reduzindo significativamente a vida útil do pneu.</li>
  <li><strong>Superaquecimento:</strong> pneus desinflados geram mais calor por atrito, aumentando o risco de estouro.</li>
  <li><strong>Estabilidade reduzida:</strong> a área de contato com o solo muda, afetando a frenagem e o controle do veículo — especialmente crítico em curvas e condições de chuva.</li>
  <li><strong>Emissões:</strong> maior consumo de combustível implica diretamente em mais emissões de CO₂, impactando as metas de sustentabilidade corporativa.</li>
</ul>

<h2>A Solução: Monitoramento Contínuo com TPMS</h2>
<p>O maior problema não é que os pneus perdem pressão — isso é inevitável. O problema é <strong>não saber quando isso acontece</strong>.</p>
<p>Um sistema TPMS como o PressurePro resolve exatamente isso: monitoramento contínuo em tempo real da pressão e temperatura de cada pneu, com alertas automáticos para o motorista e o gestor de frota antes que o problema afete a operação.</p>

<h3>Benefícios Comprovados em Frotas Reais</h3>
<ul>
  <li>Redução do consumo de combustível entre 3% e 8% dependendo do estado inicial da frota</li>
  <li>Vida útil dos pneus estendida em até 25%</li>
  <li>Redução de paradas não planejadas por falhas nos pneus</li>
  <li>ROI documentado em menos de 12 meses para frotas de médio porte</li>
</ul>

<h2>Conclusão</h2>
<p>Os dados do experimento são claros: <strong>2 bar a menos em apenas 4 pneus equivalem a 8,5% a mais de combustível</strong>. Para uma frota comercial, isso se traduz em centenas de milhares de litros — e de dólares — desperdiçados a cada ano.</p>
<p>Controlar a pressão dos pneus deixou de ser uma questão de manutenção preventiva básica. É uma decisão estratégica com impacto direto na rentabilidade da operação.</p>
<p><strong>Você sabe com certeza qual é a pressão dos pneus da sua frota agora mesmo?</strong></p>
      `,
      seoTitle: 'Pressão dos pneus e consumo de combustível: experimento real | Blog PressurePro',
      seoDescription: 'Um experimento com caminhões MAN provou que 2 bar a menos em 4 pneus aumenta o consumo em 8,5%. Para 100 caminhões, são quase 300.000 litros extras por ano.',
      seoKeywords: 'pressao pneus consumo combustivel, economia combustivel frota, TPMS frotas, monitoramento pneus, PressurePro',
    },
  },
];
