import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  Lock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Hash,
  Clock,
  Users,
  Database,
  Eye,
  Download,
  Upload,
  Zap,
  Link,
  Verified,
  Copy,
  Search
} from 'lucide-react';

interface BlockchainRecord {
  id: string;
  blockHash: string;
  previousHash: string;
  timestamp: string;
  recordType: 'attendance' | 'health' | 'nutrition' | 'badge' | 'scheme';
  studentId: string;
  studentName: string;
  data: any;
  verified: boolean;
  merkleRoot: string;
  nonce: number;
  miner: string;
}

interface SmartContract {
  id: string;
  name: string;
  type: 'attendance' | 'health_data' | 'badge_system' | 'resource_sharing';
  status: 'active' | 'deployed' | 'pending';
  transactions: number;
  gasUsed: string;
  lastExecution: string;
  description: string;
}

interface VerificationResult {
  isValid: boolean;
  confidence: number;
  issues: string[];
  verifiedBy: string;
  timestamp: string;
}

const BlockchainVerification: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRecord, setSelectedRecord] = useState<string>('');
  const [searchHash, setSearchHash] = useState('');

  // Mock blockchain data
  const [blockchainStats] = useState({
    totalBlocks: 15247,
    totalTransactions: 89456,
    verifiedRecords: 89231,
    invalidRecords: 15,
    networkNodes: 12,
    hashRate: '2.4 TH/s',
    lastBlockTime: '2024-01-29 14:32:15',
    consensusAlgorithm: 'Proof of Stake'
  });

  const [blockchainRecords] = useState<BlockchainRecord[]>([
    {
      id: '1',
      blockHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c95f6433203ad',
      previousHash: '0x6e8d94c2b0a6d4e7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4e',
      timestamp: '2024-01-29 14:30:45',
      recordType: 'attendance',
      studentId: '001',
      studentName: 'Aarav Sharma',
      data: { present: true, checkInTime: '8:30 AM', location: 'Classroom 8-A' },
      verified: true,
      merkleRoot: '0xb4c6c2d89f8a3b2e1d7c5a9f6e3d8b1a4c7e9f2b5d8a1c4e7f9b2d5a8c1e4f',
      nonce: 1847592,
      miner: 'Node-Punjab-01'
    },
    {
      id: '2',
      blockHash: '0x8a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789',
      previousHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c95f6433203ad',
      timestamp: '2024-01-29 14:31:12',
      recordType: 'health',
      studentId: '002',
      studentName: 'Priya Singh',
      data: { temperature: 98.6, bloodPressure: '110/70', vaccinationStatus: 'up-to-date' },
      verified: true,
      merkleRoot: '0xa3b5c8d1e4f7a9b2c5d8e1f4a7b9c2d5e8f1a4b7c9d2e5f8a1b4c7e9f2b5d8',
      nonce: 2947583,
      miner: 'Node-Punjab-02'
    },
    {
      id: '3',
      blockHash: '0x9b2c3d4e5f6a789bcdef0123456789abcdef0123456789abcdef0123456789ab',
      previousHash: '0x8a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789',
      timestamp: '2024-01-29 14:31:58',
      recordType: 'nutrition',
      studentId: '003',
      studentName: 'Rohit Kumar',
      data: { mealTaken: true, nutritionScore: 95, calories: 1850 },
      verified: true,
      merkleRoot: '0xc4d7e9f2b5a8c1e4f7a9b2c5d8e1f4a7b9c2d5e8f1a4b7c9d2e5f8a1b4c7e9',
      nonce: 3847294,
      miner: 'Node-Punjab-03'
    },
    {
      id: '4',
      blockHash: '0xac3d4e5f6a789bcdef0123456789abcdef0123456789abcdef0123456789abcd',
      previousHash: '0x9b2c3d4e5f6a789bcdef0123456789abcdef0123456789abcdef0123456789ab',
      timestamp: '2024-01-29 14:32:15',
      recordType: 'badge',
      studentId: '001',
      studentName: 'Aarav Sharma',
      data: { badgeType: 'Digital Literacy', level: 'Advanced', verified: true },
      verified: false,
      merkleRoot: '0xd5e8f1a4b7c9d2e5f8a1b4c7e9f2b5d8e1f4a7b9c2d5e8f1a4b7c9d2e5f8a1',
      nonce: 4947385,
      miner: 'Node-Punjab-01'
    }
  ]);

  const [smartContracts] = useState<SmartContract[]>([
    {
      id: '1',
      name: 'Attendance Verification Contract',
      type: 'attendance',
      status: 'active',
      transactions: 15247,
      gasUsed: '2.4 ETH',
      lastExecution: '2024-01-29 14:32:15',
      description: 'Automated verification of attendance records with multi-tier validation'
    },
    {
      id: '2',
      name: 'Health Data Security Contract',
      type: 'health_data',
      status: 'active',
      transactions: 8934,
      gasUsed: '1.7 ETH',
      lastExecution: '2024-01-29 14:31:42',
      description: 'Secure storage and verification of health records with privacy compliance'
    },
    {
      id: '3',
      name: 'Digital Badge System Contract',
      type: 'badge_system',
      status: 'deployed',
      transactions: 5672,
      gasUsed: '0.9 ETH',
      lastExecution: '2024-01-29 14:28:33',
      description: 'Blockchain-verified micro-credentials and achievement badges'
    },
    {
      id: '4',
      name: 'Resource Sharing Contract',
      type: 'resource_sharing',
      status: 'pending',
      transactions: 0,
      gasUsed: '0.0 ETH',
      lastExecution: 'Never',
      description: 'P2P educational resource sharing with blockchain logging'
    }
  ]);

  const [verificationResults] = useState<{ [key: string]: VerificationResult }>({
    '1': {
      isValid: true,
      confidence: 99.8,
      issues: [],
      verifiedBy: 'Multi-Node Consensus',
      timestamp: '2024-01-29 14:30:47'
    },
    '2': {
      isValid: true,
      confidence: 99.5,
      issues: [],
      verifiedBy: 'Healthcare Validator',
      timestamp: '2024-01-29 14:31:14'
    },
    '3': {
      isValid: true,
      confidence: 98.9,
      issues: ['Minor timestamp discrepancy'],
      verifiedBy: 'Nutrition Validator',
      timestamp: '2024-01-29 14:32:01'
    },
    '4': {
      isValid: false,
      confidence: 67.3,
      issues: ['Hash mismatch', 'Invalid signature', 'Consensus failure'],
      verifiedBy: 'Badge Validator',
      timestamp: '2024-01-29 14:32:17'
    }
  });

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'attendance': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'health': return 'text-green-600 bg-green-50 border-green-200';
      case 'nutrition': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'badge': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'scheme': return 'text-pink-600 bg-pink-50 border-pink-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'deployed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                Blockchain Verification
              </h1>
              <p className="text-slate-600 mt-1">Immutable Records & Smart Contract Management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                {blockchainStats.verifiedRecords.toLocaleString()} Verified
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Deploy Contract
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Blockchain Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Blocks</p>
                <p className="text-3xl font-bold text-blue-900">{blockchainStats.totalBlocks.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">Network height</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Verified Records</p>
                <p className="text-3xl font-bold text-green-900">{blockchainStats.verifiedRecords.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">99.97% success rate</p>
              </div>
              <Verified className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Network Nodes</p>
                <p className="text-3xl font-bold text-purple-900">{blockchainStats.networkNodes}</p>
                <p className="text-xs text-purple-600 mt-1">Active validators</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Hash Rate</p>
                <p className="text-3xl font-bold text-orange-900">{blockchainStats.hashRate}</p>
                <p className="text-xs text-orange-600 mt-1">Network security</p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Blockchain Overview
            </TabsTrigger>
            <TabsTrigger value="records" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Record Verification
            </TabsTrigger>
            <TabsTrigger value="contracts" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Smart Contracts
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Audit Trail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Network Status */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Link className="w-5 h-5 text-blue-500" />
                  Network Status
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">Network Health</span>
                    <span className="text-green-900 font-bold">Excellent</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium">Consensus Algorithm</span>
                    <span className="text-blue-900 font-bold">{blockchainStats.consensusAlgorithm}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700 font-medium">Last Block</span>
                    <span className="text-purple-900 font-bold">{blockchainStats.lastBlockTime}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-700 font-medium">Total Transactions</span>
                    <span className="text-orange-900 font-bold">{blockchainStats.totalTransactions.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              {/* Record Types Distribution */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  Record Types Distribution
                </h3>
                <div className="space-y-3">
                  {[
                    { type: 'Attendance Records', count: 45678, percentage: 51.2, color: 'bg-blue-500' },
                    { type: 'Health Records', count: 23456, percentage: 26.3, color: 'bg-green-500' },
                    { type: 'Nutrition Records', count: 12345, percentage: 13.8, color: 'bg-orange-500' },
                    { type: 'Badge Verification', count: 6789, percentage: 7.6, color: 'bg-purple-500' },
                    { type: 'Scheme Records', count: 987, percentage: 1.1, color: 'bg-pink-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium text-slate-600">{item.type}</div>
                      <div className="flex-1">
                        <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-slate-900 w-20 text-right">
                        {item.count.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Verified className="w-5 h-5 text-green-500" />
                  Blockchain Record Verification
                </h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by hash..."
                      value={searchHash}
                      onChange={(e) => setSearchHash(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white text-sm w-64"
                    />
                  </div>
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Verify Hash
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {blockchainRecords.map((record) => (
                  <div key={record.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                          record.verified ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                          'bg-gradient-to-br from-red-500 to-rose-500'
                        }`}>
                          {record.verified ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{record.studentName}</h4>
                          <p className="text-sm text-slate-500">Block: {truncateHash(record.blockHash)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRecordTypeColor(record.recordType)}`}>
                          {record.recordType}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.verified ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {record.verified ? 'Verified' : 'Invalid'}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Block Hash</div>
                        <div className="text-sm font-mono text-slate-900 flex items-center gap-2">
                          {truncateHash(record.blockHash)}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(record.blockHash)}
                            className="p-1 h-auto"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Merkle Root</div>
                        <div className="text-sm font-mono text-slate-900">
                          {truncateHash(record.merkleRoot)}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Nonce</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {record.nonce.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Miner</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {record.miner}
                        </div>
                      </div>
                    </div>

                    {verificationResults[record.id] && (
                      <div className="bg-slate-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-slate-900">Verification Results</h5>
                          <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                            verificationResults[record.id].confidence >= 95 ? 'bg-green-100 text-green-700' :
                            verificationResults[record.id].confidence >= 80 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {verificationResults[record.id].confidence}% Confidence
                          </div>
                        </div>
                        {verificationResults[record.id].issues.length > 0 && (
                          <div className="space-y-1">
                            {verificationResults[record.id].issues.map((issue, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-red-600">
                                <AlertTriangle className="w-4 h-4" />
                                {issue}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">
                        <Clock className="inline w-4 h-4 mr-1" />
                        {record.timestamp}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                Smart Contract Management
              </h3>
              <div className="space-y-4">
                {smartContracts.map((contract) => (
                  <div key={contract.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                          contract.status === 'active' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                          contract.status === 'deployed' ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
                          'bg-gradient-to-br from-yellow-500 to-amber-500'
                        }`}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{contract.name}</h4>
                          <p className="text-sm text-slate-500">{contract.description}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getContractStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Transactions</div>
                        <div className="text-lg font-semibold text-slate-900">
                          {contract.transactions.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Gas Used</div>
                        <div className="text-lg font-semibold text-slate-900">
                          {contract.gasUsed}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Last Execution</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {contract.lastExecution}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Contract Type</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {contract.type.replace('_', ' ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {contract.status === 'pending' ? (
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                          Deploy Contract
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Monitor
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Logs
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Blockchain Audit Trail
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: 'Block Validation',
                    timestamp: '2024-01-29 14:32:15',
                    user: 'System Validator',
                    details: 'Block #15247 validated and added to chain',
                    status: 'success'
                  },
                  {
                    action: 'Smart Contract Deployment',
                    timestamp: '2024-01-29 14:30:42',
                    user: 'Admin User',
                    details: 'Attendance Verification Contract v2.1 deployed',
                    status: 'success'
                  },
                  {
                    action: 'Consensus Failure',
                    timestamp: '2024-01-29 14:28:33',
                    user: 'Network Node',
                    details: 'Failed consensus on block #15246, retrying validation',
                    status: 'warning'
                  },
                  {
                    action: 'Record Verification',
                    timestamp: '2024-01-29 14:27:18',
                    user: 'Health Validator',
                    details: 'Health record for student ID:002 verified successfully',
                    status: 'success'
                  },
                  {
                    action: 'Invalid Transaction',
                    timestamp: '2024-01-29 14:25:55',
                    user: 'Badge Validator',
                    details: 'Transaction rejected: Invalid signature for badge verification',
                    status: 'error'
                  }
                ].map((log, idx) => (
                  <div key={idx} className={`border rounded-xl p-4 ${
                    log.status === 'success' ? 'border-green-200 bg-green-50' :
                    log.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                    'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                          log.status === 'success' ? 'bg-green-500' :
                          log.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {log.status === 'success' ? <CheckCircle className="w-4 h-4" /> :
                           log.status === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                           <AlertTriangle className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{log.action}</h4>
                          <p className="text-sm text-slate-600">{log.details}</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {log.timestamp}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 ml-11">
                      Performed by: {log.user}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlockchainVerification;