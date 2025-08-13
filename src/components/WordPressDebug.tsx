import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { testConnection } from '../lib/wordpress';
import { config } from '../lib/config';

export default function WordPressDebug() {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    try {
      const result = await testConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">WordPress GraphQL Connection Test</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          <strong>GraphQL URL:</strong> {config.wordpress.graphqlUrl}
        </p>
      </div>

      <Button onClick={runTest} disabled={loading} className="mb-4">
        {loading ? 'Testing...' : 'Test Connection'}
      </Button>

      {testResult && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Test Result:</h4>
          <pre className="bg-white p-3 rounded border text-sm overflow-auto">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
