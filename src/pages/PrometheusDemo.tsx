import { useState } from 'react';
import { searchPolicyGraph } from '../api/search';
import { matchEntities } from '../api/match';
import { explainMatch } from '../api/explain';
import PolicyMarketplaceDemoEnhanced from '../components/PolicyMarketplaceDemoEnhanced';

export default function PrometheusDemo() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isTestingAPIs, setIsTestingAPIs] = useState(false);

  const testAPIs = async () => {
    setIsTestingAPIs(true);
    const results: any = {};

    try {
      // Test search
      console.log('Testing search API...');
      results.search = await searchPolicyGraph({
        q: "school transportation",
        state: "PA",
        fy: "2025",
        limit: 3
      });

      // Test match (using first bill if available)
      if (results.search.bills?.[0]) {
        console.log('Testing match API...');
        results.matches = await matchEntities("bill", results.search.bills[0].id, 3);

        // Test explain (using first match if available)
        if (results.matches?.[0]) {
          console.log('Testing explain API...');
          results.explanation = await explainMatch(
            results.matches[0].a_type,
            results.matches[0].a_id,
            results.matches[0].b_type,
            results.matches[0].b_id
          );
        }
      }

      setTestResults(results);
    } catch (error) {
      console.error('API test failed:', error);
      setTestResults({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsTestingAPIs(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            PrometheusXAI — Policy Graph Explorer
          </h1>
          <p className="mt-2 text-gray-600">
            Semantic exploration of Bills ↔ Budgets ↔ Projects ↔ Lobbying
          </p>
          
          {/* API Testing */}
          <div className="mt-4 flex gap-4 items-center">
            <button
              onClick={testAPIs}
              disabled={isTestingAPIs}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isTestingAPIs ? 'Testing APIs...' : 'Test APIs'}
            </button>
            
            {testResults && (
              <div className="text-sm">
                {testResults.error ? (
                  <span className="text-red-600">❌ API Error: {testResults.error}</span>
                ) : (
                  <span className="text-green-600">✅ APIs Working</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Demo Component */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PolicyMarketplaceDemoEnhanced />
      </div>

      {/* API Test Results */}
      {testResults && !testResults.error && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">API Test Results</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Search Results:</h3>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(testResults.search, null, 2)}
                </pre>
              </div>
              
              {testResults.matches && (
                <div>
                  <h3 className="font-medium">Semantic Matches:</h3>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(testResults.matches, null, 2)}
                  </pre>
                </div>
              )}
              
              {testResults.explanation && (
                <div>
                  <h3 className="font-medium">Match Explanation:</h3>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(testResults.explanation, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            🔥 PrometheusXAI Demo Instructions
          </h2>
          <div className="text-blue-800 space-y-2 text-sm">
            <p><strong>Search:</strong> Try "school transportation", "clean energy", "hospital cyber", "rural broadband"</p>
            <p><strong>Entity Matching:</strong> Click any item to find semantic matches across all categories</p>
            <p><strong>Explainability:</strong> Click "Explain this match" to see AI reasoning with feature weights</p>
            <p><strong>Data Sources:</strong> Currently using enhanced mock data; swap to live APIs when ready</p>
            <p><strong>Custom GPT:</strong> Use the config in /docs/ to create your PrometheusXAI assistant</p>
          </div>
        </div>
      </div>
    </div>
  );
}