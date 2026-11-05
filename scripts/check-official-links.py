"""Read publisher-provided outbound journal links; no guessing of slugs."""
import concurrent.futures
import json
from pathlib import Path
import urllib.request
from html.parser import HTMLParser

PAGES = [["https://shop.elsevier.com/journals/medical-image-analysis/1361-8415","Medical Image Analysis"],["https://shop.elsevier.com/journals/biomaterials/0142-9612","Biomaterials"],["https://shop.elsevier.com/journals/biosensors-and-bioelectronics/0956-5663","Biosensors and Bioelectronics"],["https://shop.elsevier.com/journals/acta-biomaterialia/1742-7061","Acta Biomaterialia"],["https://shop.elsevier.com/journals/artificial-intelligence-in-medicine/0933-3657","Artificial Intelligence in Medicine"],["https://shop.elsevier.com/journals/seminars-in-nuclear-medicine/0001-2998","Seminars in Nuclear Medicine"],["https://shop.elsevier.com/journals/colloids-and-surfaces-b-biointerfaces/0927-7765","Colloids and Surfaces B: Biointerfaces"],["https://shop.elsevier.com/journals/biomaterials-advances/2772-9508","Biomaterials Advances"],["https://shop.elsevier.com/journals/computer-methods-and-programs-in-biomedicine/0169-2607","Computer Methods and Programs in Biomedicine"],["https://shop.elsevier.com/journals/neuroimage/1053-8119","NeuroImage"],["https://shop.elsevier.com/journals/computerized-medical-imaging-and-graphics/0895-6111","Computerized Medical Imaging and Graphics"],["https://shop.elsevier.com/journals/journal-of-cardiovascular-computed-tomography/1934-5925","Journal of Cardiovascular Computed Tomography"],["https://shop.elsevier.com/journals/radiotherapy-and-oncology/0167-8140","Radiotherapy & Oncology"],["https://shop.elsevier.com/journals/academic-radiology/1076-6332","Academic Radiology"],["https://shop.elsevier.com/journals/international-journal-of-medical-informatics/1386-5056","International Journal of Medical Informatics"],["https://shop.elsevier.com/journals/journal-of-the-american-college-of-radiology/1546-1440","Journal of the American College of Radiology"],["https://shop.elsevier.com/journals/journal-of-electromyography-and-kinesiology/1050-6411","Journal of Electromyography and Kinesiology"],["https://shop.elsevier.com/journals/journal-of-biomedical-informatics/1532-0464","Journal of Biomedical Informatics"],["https://shop.elsevier.com/journals/european-journal-of-radiology/0720-048X","European Journal of Radiology"],["https://shop.elsevier.com/journals/biomedical-signal-processing-and-control/1746-8094","Biomedical Signal Processing and Control"],["https://shop.elsevier.com/journals/biocybernetics-and-biomedical-engineering/0208-5216","Biocybernetics and Biomedical Engineering"],["https://shop.elsevier.com/journals/journal-of-the-mechanical-behavior-of-biomedical-materials/1751-6161","Journal of the Mechanical Behavior of Biomedical Materials"],["https://shop.elsevier.com/journals/ultrasound-in-medicine-and-biology/0301-5629","Ultrasound in Medicine & Biology"],["https://shop.elsevier.com/journals/gait-and-posture/0966-6362","Gait & Posture"],["https://shop.elsevier.com/journals/current-opinion-in-biomedical-engineering/2468-4511","Current Opinion in Biomedical Engineering"],["https://shop.elsevier.com/journals/journal-of-biomechanics/0021-9290","Journal of Biomechanics"],["https://shop.elsevier.com/journals/clinical-imaging/0899-7071","Clinical Imaging"],["https://shop.elsevier.com/journals/physica-medica/1120-1797","Physica Medica"],["https://shop.elsevier.com/journals/magnetic-resonance-imaging/0730-725X","Magnetic Resonance Imaging"],["https://shop.elsevier.com/journals/clinical-biomechanics/0268-0033","Clinical Biomechanics"]]

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = set()
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for key, value in attrs:
                if key == 'href' and value and 'sciencedirect.com/' in value:
                    self.urls.add(value)

def fetch(page):
    url, name = page
    try:
        request = urllib.request.Request(url, headers={'User-Agent': 'JournalAtlas-LinkCheck/1.0'})
        with urllib.request.urlopen(request, timeout=25) as response:
            parser = Links()
            parser.feed(response.read().decode('utf-8'))
        return {'name': name, 'source': url, 'links': sorted(parser.urls)}
    except Exception as exc:
        return {'name': name, 'source': url, 'error': str(exc)}

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        results = list(pool.map(fetch, PAGES))
    Path('docs/official-link-check.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(results, ensure_ascii=False, indent=2))
