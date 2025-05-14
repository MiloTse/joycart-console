import { useEffect, useState, type SetStateAction } from 'react'
import { fetchCurrentUser, searchUserByUsername } from '../api/user';
import type { User } from '../types/models';
import './Mine.css';

export default function Mine() {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<User[]>([])
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        console.log('Mine component mounted, fetching user data...');
        fetchCurrentUser()
            .then((data: User) => {
                console.log('User data received:', data);
                setUser(data);
            })
            .catch((err: { message: SetStateAction<string> }) => {
                console.error('Error fetching user:', err);
                setError(err.message);
            })
    }, [])

    // 处理查询输入变化
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // 处理查询提交
    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            setIsSearching(true);
            console.log('Searching for user:', searchTerm);
            const results = await searchUserByUsername(searchTerm);
            console.log('Search results:', results);
            setSearchResults(results);
            setError('');
        } catch (err: any) {
            console.error('Search error:', err);
            setError(`查询失败: ${err.message}`);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    if (error) return <div className="error-message">加载出错：{error}</div>
    if (!user) return <div className="loading-message">加载中…</div>

    return (
        <div className="user-profile">
            <div className="search-section">

                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="输入用户名查询"
                        className="search-input"
                    />
                    <button type="submit" className="search-button" disabled={isSearching}>
                        {isSearching ? '查询中...' : '查询'}
                    </button>
                </form>

                {isSearching && <div className="loading-message">正在查询...</div>}

                {searchResults.length > 0 ? (
                    <div className="search-results">
                        <h4>查询结果：</h4>
                        <div className="results-list">
                            {searchResults.map(result => (
                                <div key={result.id || result.username} className="result-item">
                                    <p><strong>用户名：</strong>{result.username}</p>
                                    <p><strong>邮箱：</strong>{result.email}</p>
                                    <p><strong>手机号：</strong>{result.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : searchTerm && !isSearching ? (
                    <div className="no-results">未找到匹配的用户</div>
                ) : null}
            </div>
        </div>
    )
}