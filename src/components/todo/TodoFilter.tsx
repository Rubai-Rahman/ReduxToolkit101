import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  setFilter,
  setPriorityFilter,
  setSearchQuery,
  clearCompleted,
  selectTodoFilter,
  selectPriorityFilter,
  selectSearchQuery,
  selectTodoStats,
  type TodoFilter as TodoFilterType,
  type PriorityFilter,
} from '@/redux/features/todo/todoSlice';

const TodoFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectTodoFilter);
  const currentPriorityFilter = useSelector(selectPriorityFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const stats = useSelector(selectTodoStats);

  const handleFilterChange = (filter: TodoFilterType) => {
    dispatch(setFilter(filter));
  };

  const handlePriorityFilterChange = (priority: PriorityFilter) => {
    dispatch(setPriorityFilter(priority));
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const clearAllFilters = () => {
    dispatch(setFilter('all'));
    dispatch(setPriorityFilter('all'));
    dispatch(setSearchQuery(''));
  };

  const hasActiveFilters =
    currentFilter !== 'all' ||
    currentPriorityFilter !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSearchChange('')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <Select value={currentFilter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks ({stats.total})</SelectItem>
            <SelectItem value="pending">Pending ({stats.pending})</SelectItem>
            <SelectItem value="completed">
              Completed ({stats.completed})
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select
          value={currentPriorityFilter}
          onValueChange={handlePriorityFilterChange}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>

        {/* More Filters Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Advanced Filters & Actions</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <h4 className="font-medium mb-3">Quick Actions</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCompleted}
                  disabled={stats.completed === 0}
                  className="w-full justify-start"
                >
                  Clear Completed Tasks ({stats.completed})
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-3">Task Statistics</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Total:</span>
                    <Badge variant="outline">{stats.total}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Pending:</span>
                    <Badge variant="secondary">{stats.pending}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>Completed:</span>
                    <Badge variant="default">{stats.completed}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>High Priority:</span>
                    <Badge variant="destructive">{stats.highPriority}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {currentFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Status: {currentFilter}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilterChange('all')}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {currentPriorityFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Priority: {currentPriorityFilter}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePriorityFilterChange('all')}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {searchQuery.trim() && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchQuery}"
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSearchChange('')}
                className="h-4 w-4 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoFilter;
