import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, Building2, Calendar, DollarSign } from 'lucide-react';
import logo from './assets/logo.jpg';
export default function App() {
  const [surface, setSurface] = useState(100);
  const [nombreAnne, setNombreAnne] = useState(1);
  const [firstYear, setFirstYear] = useState(2022);
  const [endDateStr, setEndDateStr] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const tarif = useMemo(() => surface * 6, [surface]);
  const totaleAPayer = useMemo(() => tarif * nombreAnne, [tarif, nombreAnne]);

  const allYearsDetails = useMemo(() => {
    const endDate = new Date(endDateStr + "T00:00:00");
    const currentYear = endDate.getFullYear();
    let results = [];
    let totalGlobal = 0;

    for (let year = firstYear; year <= currentYear; year++) {
      const pd = 500;
      const pr = 0.1 * tarif;
      const mgpm = 0.05 * tarif;

      const startMonth = 3;
      const start = new Date(`${year}-04-01T00:00:00`);
      let months = (endDate.getFullYear() - start.getFullYear()) * 12 + (endDate.getMonth() - start.getMonth()) + 1;
      if (months < 0) months = 0;

      const mjAvril = months * 0.005 * tarif;
      const totalYear = pd + pr + mgpm + mjAvril;

      totalGlobal += totalYear;

      results.push({
        year,
        pd,
        pr,
        mgpm,
        mjAvril,
        totalYear
      });
    }

    return { results, totalGlobal };
  }, [firstYear, endDateStr, tarif]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header avec logo */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                {/* <Calculator className="h-8 w-8 text-white" /> */}
                <img src={logo} className="w-[150px] rounded-full" alt="" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  MONTANT DES SOMMES A ENCAISSER
                </CardTitle>
                {/* <CardDescription className="text-blue-100 text-lg mt-1">
                  Système de calcul professionnel des taxes foncières
                </CardDescription> */}
              </div>
            </div>
            <Badge variant="secondary" className="mx-auto w-fit bg-white/20 text-white border-white/30">
              Version 2.0 - Édition Professionnelle
            </Badge>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panneau de saisie */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span>Paramètres de calcul</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="surface" className="text-sm font-semibold text-gray-700">
                    Surface (m²)
                  </Label>
                  <Input
                    id="surface"
                    type="number"
                    value={surface}
                    onChange={(e) => setSurface(Number(e.target.value))}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Entrez la surface"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombreAnne" className="text-sm font-semibold text-gray-700">
                    Nombre d'années
                  </Label>
                  <Input
                    id="nombreAnne"
                    type="number"
                    value={nombreAnne}
                    onChange={(e) => setNombreAnne(Number(e.target.value))}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Nombre d'années"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstYear" className="text-sm font-semibold text-gray-700">
                    Première année
                  </Label>
                  <Input
                    id="firstYear"
                    type="number"
                    value={firstYear}
                    onChange={(e) => setFirstYear(Number(e.target.value))}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Année de début"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-semibold text-gray-700">
                    Date de fin
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDateStr}
                    onChange={(e) => setEndDateStr(e.target.value)}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Résumé rapide */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Résumé financier</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-sm font-medium text-gray-600">Tarif unitaire:</span>
                  <span className="font-bold text-gray-900">{tarif.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg">
                  <span className="text-sm font-medium text-green-700">Total à payer:</span>
                  <span className="font-bold text-green-800 text-lg">{totaleAPayer.toFixed(2)} DH</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tableau détaillé */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Détail par année</span>
                </CardTitle>
                <CardDescription>
                  Calcul détaillé des taxes pour chaque année
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 border-b">Année</th>
                        <th className="px-4 py-4 text-right text-sm font-semibold text-gray-700 border-b">PD</th>
                        <th className="px-4 py-4 text-right text-sm font-semibold text-gray-700 border-b">PR</th>
                        <th className="px-4 py-4 text-right text-sm font-semibold text-gray-700 border-b">MGPM</th>
                        <th className="px-4 py-4 text-right text-sm font-semibold text-gray-700 border-b">MJ Avril</th>
                        <th className="px-4 py-4 text-right text-sm font-semibold text-gray-700 border-b">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allYearsDetails.results.map((row, index) => (
                        <tr key={row.year} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-25' : 'bg-white'}`}>
                          <td className="px-4 py-4 font-medium text-gray-900 border-b border-gray-100">
                            <Badge variant="outline" className="font-mono">
                              {row.year}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-right text-gray-700 font-mono border-b border-gray-100">
                            {row.pd.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-right text-gray-700 font-mono border-b border-gray-100">
                            {row.pr.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-right text-gray-700 font-mono border-b border-gray-100">
                            {row.mgpm.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-right text-gray-700 font-mono border-b border-gray-100">
                            {row.mjAvril.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-right font-bold text-blue-600 font-mono border-b border-gray-100">
                            {row.totalYear.toFixed(2)} DH
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Total Global</h3>
                      <p className="text-sm text-gray-600">Montant total calculé sur toutes les années</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 font-mono">
                        {allYearsDetails.totalGlobal.toFixed(2)} DH
                      </div>
                      {/* <Badge className="bg-blue-600 text-white mt-2">
                        Calcul finalisé
                      </Badge> */}
                    </div>
                  </div>
                  <div className="flex mt-4 bg-emerald-300 p-3 rounded-2xl justify-center items-center">
                    {/* <div>
                      <h3 className="text-lg font-semibold text-gray-800">Total</h3>
                    </div> */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-500 font-mono">
                        {totaleAPayer +allYearsDetails.totalGlobal} DH
                      </div>
                      <Badge className="bg-blue-600 text-white mt-2">
                        Calcul finalisé
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card className="border-0 bg-gray-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">
              © 2024 Calculateur de Dariba Professional • Développé pour une gestion fiscale optimale
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}